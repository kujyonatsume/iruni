<script setup>
import { mdiPlay, mdiRewind, mdiFastForward, mdiUpdate, mdiDelete, mdiPlus, mdiContentCopy, mdiMenuUp, mdiMenuDown } from "@mdi/js"
useTitle().set("歌曲打軸");
/** @type {Ref<HTMLVideoElement>} type - description */
const video = ref();
const edittxt = ref(true);
const lyricsList = ref([]);
onMounted(()=> {
    video.value = new HTMLVideoElement()
    video.value
})
const timeRegex = /\[(\d+):(\d+\.\d+)\]/
const obj = ref({ title: "", videoId: "", lyric: "" })
// 音樂上傳功能
function uploadAudio(event) {
    /** @type {HTMLInputElement} type - description */
    const e = event.target
    const file = e.files[0];
    if (file) {
        file.type
        const nameMatch = file.name.match(/(?:\d+-\d+) (.*?) \[(.*?)\]/)
        obj.value.title = nameMatch?.[1] ?? ""
        obj.value.videoId = nameMatch?.[2] ?? ""
        const url = URL.createObjectURL(file);
        video.value.src = url;
        video.value.play();
    }
};

// 快進/快退功能
function jump(seconds) { audio.value.currentTime = Math.max(0, Math.min(audio.value.duration, audio.value.currentTime + seconds)) }

// 載入歌詞到編輯區
function updateLyrics() {
    const lyrics = obj.value.lyric.trim().split('\n');
    lyricsList.value = lyrics.map((line, index) => ({ time: line.match(timeRegex) ?? "[99:59.99]", lyrics: line.replace(timeRegex, "").trim(), index }));
};

// 點擊「更新時間」按鈕
function setTime(index, num) {
    num ??= audio.value.currentTime;
    const minutes = `${Math.floor(num / 60)}`;
    const seconds = (num % 60).toFixed(2);
    lyricsList.value[index].time = `[${minutes.padStart(2, '0')}:${seconds.padStart(5, '0')}]`;
    sortLyricsList()
};

function updateTime(index, num) {
    const m = lyricsList.value[index].time.match(timeRegex)
    setTime(index, Math.max(Number(m[1]) * 60 + Number(m[2]) + num, 0))
};

// 點擊「播放」按鈕
function playAtTime(timeValue) {
    const m = timeValue.match(timeRegex);
    if (m) {
        audio.value.currentTime = Number(m[1]) * 60 + Number(m[2]);
        audio.value.play();
    }
};

// 刪除歌詞行
function deleteLine(index) {
    lyricsList.value.splice(index, 1);
};

// 根據當前時間插入空行
function insertEmptyLine() {
    const currentTime = audio.value.currentTime;
    lyricsList.value.push({ time: `[${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toFixed(2).toString().padStart(5, '0')}]`, lyrics: '', index: lyricsList.value.length });
    sortLyricsList();

};

async function copy() {
    const text = JSON.stringify(obj.value, null, 4)
    if (navigator.clipboard) await navigator.clipboard.writeText(text)
    else window.Clipboard.setData("Text", text);
}

// 排序歌詞列表
function sortLyricsList() {
    lyricsList.value.sort((a, b) => {
        const timeA = a.time.match(timeRegex);
        const timeB = b.time.match(timeRegex);
        const timeASeconds = parseInt(timeA[1], 10) * 60 + parseFloat(timeA[2]);
        const timeBSeconds = parseInt(timeB[1], 10) * 60 + parseFloat(timeB[2]);
        return timeASeconds - timeBSeconds;
    });
    obj.value.lyric = lyricsList.value.map(x => `${x.time} ${x.lyrics}`).join("\n")
};

</script>

<template>
    <v-container>
        <v-file-input label="上傳音樂" accept="audio/*,video/*" @change="uploadAudio" />
        <input type="range" class="progress-bar" v-model="video.currentValue" :max="max" :min="min" @input="onInput" />
        <div style="display: flex;justify-content: space-between; justify-items: center;">
            <div :style="{ margin: '2px' }">
                <v-btn :style="{ margin: '2px' }" @click="insertEmptyLine"><v-icon>{{ mdiPlus }}</v-icon></v-btn>
                <v-btn :style="{ margin: '2px' }" @click="jump(-3)"><v-icon>{{ mdiRewind }}</v-icon></v-btn>
                <v-btn :style="{ margin: '2px' }" @click="jump(+3)"><v-icon>{{ mdiFastForward }}</v-icon></v-btn>
            </div>
            <h3>{{ obj.title }}</h3>
            <v-btn :disabled="obj.title == ''" target="_blank" rel="noreferrer"
                :href="`https://www.bing.com/search?q=${obj.title} 歌詞 kkbox`">搜尋歌詞</v-btn>
        </div>
        <v-textarea v-if="edittxt" :style="{ margin: '2px' }" v-model="obj.lyric" @update:model-value="updateLyrics"
            rows="20" outlined />
        <div v-else class="lyrics-container">
            <div style="display: flex;" v-for="(item, index) in lyricsList" :key="index">
                <v-btn :style="{ margin: '2px' }" @click="playAtTime(item.time)" color="primary"><v-icon>{{ mdiPlay
                        }}</v-icon></v-btn>
                <v-btn :style="{ margin: '2px' }" @click="setTime(index, undefined)" color="primary"><v-icon>{{
                        mdiUpdate }}</v-icon></v-btn>
                <div style="display: flex;justify-content: left;">
                    <input :style="{ margin: '2px' }" @change="sortLyricsList" v-model="item.time"
                        style="width: 100px; text-align: center;" />
                    <div :style="{ margin: '2px', width: '50px' }"
                        style="display: flex; flex-direction: column; align-content: center;">
                        <v-btn :min-width="'50px'" :style="{ height: '50%', width: '50px' }"
                            @click="updateTime(index, +0.5)" color="primary"><v-icon>{{ mdiMenuUp }}</v-icon></v-btn>
                        <v-btn :min-width="'50px'" :style="{ height: '50%', width: '50px' }"
                            @click="updateTime(index, -0.5)" color="primary"><v-icon>{{ mdiMenuDown }}</v-icon></v-btn>
                    </div>
                </div>
                <input :style="{ margin: '2px' }" @change="sortLyricsList" v-model="item.lyrics" style="width: 100%;" />
                <v-btn :style="{ margin: '2px' }" @click="deleteLine(index)" color="error"><v-icon>{{ mdiDelete
                        }}</v-icon></v-btn>
            </div>
        </div>
        <v-btn :style="{ margin: '2px' }" color="info" @click="edittxt = !edittxt">{{ edittxt ? '切換到編輯模式' : '切換到文本'
            }}</v-btn>
        <v-btn :style="{ margin: '2px' }" color="info" @click="copy"><v-icon>{{ mdiContentCopy }}</v-icon></v-btn>
    </v-container>

</template>

<style scoped>
.lyrics-container {
    width: 100%;
    height: 534px;
    color: darkgrey;
    font-size: 14px;
    position: relative;
    overflow-y: scroll;

}
</style>