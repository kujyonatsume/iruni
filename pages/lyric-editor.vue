<script setup>

import { mdiPlay, mdiRewind, mdiFastForward, mdiUpdate, mdiDelete, mdiPlus } from "@mdi/js"

const audio = ref(null);
const lyricsInput = ref("")
const lyricsList = ref([]);

const timeRegex = /\[(\d+):(\d+\.\d+)\]/

// 音樂上傳功能
const uploadAudio = (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.value.src = url;
        audio.value.play();
    }
};

// 快進/快退功能
function jump(seconds) { audio.value.currentTime = Math.max(0, Math.min(audio.value.duration, audio.value.currentTime + seconds)); }

// 載入歌詞到編輯區
function updateLyrics() {
    const lyrics = lyricsInput.value.trim().split('\n');
    lyricsList.value = lyrics.map((line, index) => ({ time: line.match(timeRegex)?.[0] ?? "[99:59.99]", lyrics: line.replace(timeRegex, "").trim(), index }));
};

// 點擊「更新時間」按鈕
function updateTime(index) {
    const currentTime = audio.value.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = (currentTime % 60).toFixed(2);
    lyricsList.value[index].time = `[${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}]`;
    sortLyricsList()
};



// 點擊「播放」按鈕
function playAtTime(timeValue) {
    const match = timeValue.match(timeRegex);
    if (match) {
        audio.value.currentTime = parseInt(match[1], 10) * 60 + parseFloat(match[2]);
        audio.value.play();
    }
};

// 刪除歌詞行
function deleteLine(index) {
    lyricsList.value.splice(index, 1);
    sortLyricsList()
};

// 根據當前時間插入空行
function insertEmptyLine() {
    const currentTime = audio.value.currentTime;
    lyricsList.value.push({ time: `[${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toFixed(2).toString().padStart(5, '0')}]`, lyrics: '', index: lyricsList.value.length });
    // 重新排序
    sortLyricsList();

};

// 排序歌詞列表
function sortLyricsList() {
    lyricsList.value.sort((a, b) => {
        const timeA = a.time.match(timeRegex);
        const timeB = b.time.match(timeRegex);
        const timeASeconds = parseInt(timeA[1], 10) * 60 + parseFloat(timeA[2]);
        const timeBSeconds = parseInt(timeB[1], 10) * 60 + parseFloat(timeB[2]);
        return timeASeconds - timeBSeconds;
    });
    lyricsInput.value = lyricsList.value.map(x => `${x.time} ${x.lyrics}`).join("\n")
};

</script>

<template>
    <v-container>
        <v-file-input label="上傳音樂" accept="audio/*,video/*" @change="uploadAudio" />
        <audio :style="{margin: '2px' }" style="width: 100%;" ref="audio" controls> 您的瀏覽器不支援 audio 標籤</audio>
        <div :style="{margin: '2px' }">
            <div style="display: flex;" v-for="(item, index) in lyricsList" :key="index"
                @dblclick="playAtTime(item.time)">
                <v-btn :style="{margin: '2px' }" @click="updateTime(index)" color="primary"><v-icon>{{ mdiUpdate }}</v-icon></v-btn>
                <input :style="{margin: '2px' }" @change="sortLyricsList" v-model="item.time" style="width: 150px; text-align: center;" />
                <input :style="{margin: '2px' }" @change="sortLyricsList" v-model="item.lyrics" style="width: 100%;" />
                <v-btn :style="{margin: '2px' }" @click="deleteLine(index)" color="error"><v-icon>{{ mdiDelete }}</v-icon></v-btn>
            </div>
        </div>
        <div :style="{margin: '2px' }">
            <v-btn :style="{margin: '2px' }" @click="insertEmptyLine"><v-icon>{{ mdiPlus }}</v-icon></v-btn>
            <v-btn :style="{margin: '2px' }" @click="jump(-3)"><v-icon>{{ mdiRewind }}</v-icon></v-btn>
            <v-btn :style="{margin: '2px' }" @click="jump(+3)"><v-icon>{{ mdiFastForward }}</v-icon></v-btn>
        </div>
        <v-textarea :style="{margin: '2px' }" v-model="lyricsInput" @update:model-value="updateLyrics" rows="6" outlined />
    </v-container>

</template>
