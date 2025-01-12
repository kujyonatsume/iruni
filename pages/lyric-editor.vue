<script setup>
const audio = ref(null);
const lyricsInput = ref('');
const lyricsList = ref([]);
const downloadUrl = ref(null);

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
const rewind = (seconds) => {
    audio.value.currentTime = Math.max(0, audio.value.currentTime - seconds);
};

const forward = (seconds) => {
    audio.value.currentTime = Math.min(audio.value.duration, audio.value.currentTime + seconds);
};

// 載入歌詞到編輯區
const loadLyrics = () => {
    const lyrics = lyricsInput.value.trim().split('\n');
    if (!lyrics.length || !lyrics[0]) {
        alert('請輸入歌詞內容！');
        return;
    }

    lyricsList.value = lyrics.map((line, index) => ({
        time: `[99:59.99]`,
        lyrics: line,
        index
    }));
};

// 點擊「更新時間」按鈕
const updateTime = (index) => {
    const currentTime = audio.value.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = (currentTime % 60).toFixed(2);
    lyricsList.value[index].time = `[${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}]`;
};

// 點擊「播放」按鈕
const playAtTime = (timeValue) => {
    const match = timeValue.match(/\[(\d+):(\d+\.\d+)\]/);
    if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        const targetTime = minutes * 60 + seconds;
        audio.value.currentTime = targetTime;
        audio.value.play();
    }
};

// 刪除歌詞行
const deleteLine = (index) => {
    lyricsList.value.splice(index, 1);
};

// 根據當前時間插入空行
const insertEmptyLine = () => {
    const currentTime = audio.value.currentTime;
    const newLine = {
        time: `[${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(2)}]`,
        lyrics: '',
        index: lyricsList.value.length
    };
    lyricsList.value.push(newLine);

    // 重新排序
    sortLyricsList();
};

// 排序歌詞列表
const sortLyricsList = () => {
    lyricsList.value.sort((a, b) => {
        const timeA = a.time.match(/\[(\d+):(\d+\.\d+)\]/);
        const timeB = b.time.match(/\[(\d+):(\d+\.\d+)\]/);
        const timeASeconds = parseInt(timeA[1], 10) * 60 + parseFloat(timeA[2]);
        const timeBSeconds = parseInt(timeB[1], 10) * 60 + parseFloat(timeB[2]);
        return timeASeconds - timeBSeconds;
    });
};

// 生成 LYC 檔案
const generateLyricFile = () => {
    const lycContent = lyricsList.value
        .map(line => `${line.time} ${line.lyrics}`)
        .join('\n');

    const blob = new Blob([lycContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    downloadUrl.value = url;
};
</script>

<template>
    <div id="lyrics-container" class="lyrics-container">
        <div id="top">
            <input type="file" id="upload-audio" accept="audio/*,video/*" @change="uploadAudio" />
            <audio ref="audio" controls> 您的瀏覽器不支援 audio 標籤。 </audio>
            <div class="controls">
                <button @click="insertEmptyLine">根據當前時間插入空行</button>
                <button @click="rewind(5)">⏪ -5秒</button>
                <button @click="rewind(1)">⏪ -1秒</button>
                <button @click="rewind(0.5)">⏪ -0.5秒</button>
                <button @click="forward(0.5)">⏩ +0.5秒</button>
                <button @click="forward(1)">⏩ +1秒</button>
                <button @click="forward(5)">⏩ +5秒</button>
                <button @click="generateLyricFile" class="download-btn">生成並下載 LYC</button>
                <a v-if="downloadUrl" :href="downloadUrl" download="lyrics.lyc">下載 LYC 檔案</a>
            </div>
        </div>
        <textarea v-model="lyricsInput" placeholder="每行輸入一段歌詞" rows="6" style="width: 80%;"></textarea>
        <button @click="loadLyrics">載入歌詞</button>
        <h3>編輯歌詞和時間</h3>
        <div id="lyrics-list">
            <div v-for="(item, index) in sortedLyrics" :key="index" class="lyrics-item" :data-index="index">
                <button @click="playAtTime(item.time)" class="play-btn">播放</button>
                <input type="text" v-model="item.time" class="time-input" />
                <input type="text" v-model="item.lyrics" class="lyrics-input" />
                <button @click="updateTime(index)" class="update-time-btn">更新時間</button>
                <button @click="deleteLine(index)" class="delete-btn">刪除</button>
            </div>
        </div>
    </div>
</template>

<style>
body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    background: #f9f9f9;
}

audio {
    margin-top: 20px;
    width: 80%;
}

.controls {
    margin: 10px 0;
}

.controls button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}

.lyrics-container {
    margin-top: 20px;
    text-align: center;
    display: inline-block;
    width: 80%;
    margin-top: 180px;
}

.lyrics-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 5px;
    cursor: pointer;
}

.lyrics-item input {
    font-size: 14px;
    text-align: center;
}

.update-time-btn {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}

.delete-btn {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
}

.lyrics-item:hover {
    background: #f0f0f0;
}

.lyrics-item input {
    margin: 0 5px;
    padding: 5px;
    font-size: 14px;
    width: 30%;
}

button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}

.download-btn {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
}

#top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f1f1f1;
    padding: 10px;
    box-sizing: border-box;
    z-index: 1000;
    border-bottom: 1px solid #ccc;
}
</style>
