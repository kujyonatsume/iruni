<script>
const audio = document.getElementById('audio');
const uploadAudio = document.getElementById('upload-audio');
const rewind5 = document.getElementById('rewind-5');
const rewind1 = document.getElementById('rewind-1');
const rewind05 = document.getElementById('rewind-0.5');
const forward05 = document.getElementById('forward-0.5');
const forward1 = document.getElementById('forward-1');
const forward5 = document.getElementById('forward-5');
const lyricsInput = document.getElementById('lyrics-input');
const loadLyricsBtn = document.getElementById('load-lyrics-btn');
const lyricsList = document.getElementById('lyrics-list');
const generateBtn = document.getElementById('generate-btn');
const downloadLink = document.getElementById('download-link');
const insertEmptyLineBtn = document.getElementById('insert-empty-line');

// 音樂上傳功能
uploadAudio.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        audio.src = url;
        audio.play();
    }
});

// 快進/快退功能
rewind5.addEventListener('click', () => audio.currentTime = Math.max(0, audio.currentTime - 5));
rewind1.addEventListener('click', () => audio.currentTime = Math.max(0, audio.currentTime - 1));
rewind05.addEventListener('click', () => audio.currentTime = Math.max(0, audio.currentTime - 0.5));
forward05.addEventListener('click', () => audio.currentTime = Math.min(audio.duration, audio.currentTime + 0.5));
forward1.addEventListener('click', () => audio.currentTime = Math.min(audio.duration, audio.currentTime + 1));
forward5.addEventListener('click', () => audio.currentTime = Math.min(audio.duration, audio.currentTime + 5));

// 載入歌詞到編輯區
loadLyricsBtn.addEventListener('click', () => {
    const lyrics = lyricsInput.value.trim().split('\n');
    if (!lyrics.length || !lyrics[0]) {
        alert('請輸入歌詞內容！');
        return;
    }

    lyricsList.innerHTML = ''; // 清空清單
    lyrics.forEach((line, index) => {
        const lyricsItem = document.createElement('div');
        lyricsItem.className = 'lyrics-item';
        lyricsItem.dataset.index = index; // 設置行索引
        lyricsItem.innerHTML = `
                <button class="play-btn" data-index="${index}">播放</button> <!-- 新增播放按鈕 -->
                <input type="text" class="time-input" value="[99:59.99]" data-index="${index}" />
                <input type="text" class="lyrics-input" value="${line}" data-index="${index}" />
                <button class="update-time-btn" data-index="${index}">更新時間</button>
                <button class="delete-btn" data-index="${index}">刪除</button> <!-- 刪除按鈕 -->

            `;
        lyricsList.appendChild(lyricsItem);
    });
});

// 點擊「更新時間」按鈕
lyricsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('update-time-btn')) {
        const index = event.target.dataset.index;
        const timeInput = document.querySelector(`.time-input[data-index="${index}"]`);
        const currentTime = audio.currentTime;

        // 將當前時間轉為 [mm:ss.SS] 格式
        const minutes = Math.floor(currentTime / 60);
        const seconds = (currentTime % 60).toFixed(2);
        timeInput.value = `[${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}]`;
    }

    // 點擊「播放」按鈕
    if (event.target.classList.contains('play-btn')) {
        const index = event.target.dataset.index;
        const timeInput = document.querySelector(`.time-input[data-index="${index}"]`);
        const timeValue = timeInput.value.match(/\[(\d+):(\d+\.\d+)\]/);

        if (timeValue) {
            const minutes = parseInt(timeValue[1], 10);
            const seconds = parseFloat(timeValue[2]);
            const targetTime = minutes * 60 + seconds;

            // 跳轉到指定時間並播放
            audio.currentTime = targetTime;
            audio.play();
        }
    }
});

// 刪除歌詞行
lyricsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        const lyricsItem = document.querySelector(`.lyrics-item[data-index="${index}"]`);
        if (lyricsItem) {
            lyricsList.removeChild(lyricsItem);
        }
    }
});

// 生成 LYC 檔案
generateBtn.addEventListener('click', () => {
    const lines = Array.from(document.querySelectorAll('.lyrics-item'));
    const lycContent = lines.map(line => {
        const time = line.querySelector('.time-input').value.trim();
        const lyrics = line.querySelector('.lyrics-input').value.trim();
        return `${time} ${lyrics}`;
    }).join('\n');

    const blob = new Blob([lycContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'lyrics.lyc';
    downloadLink.style.display = 'inline-block';
    downloadLink.textContent = '下載 LYC 檔案';
});

// 根據當前時間插入空行
insertEmptyLineBtn.addEventListener('click', () => {
    const currentTime = audio.currentTime;
    const emptyLine = document.createElement('div');
    emptyLine.className = 'lyrics-item';
    emptyLine.innerHTML = `
        <button class="play-btn">播放</button> <!-- 播放按鈕 -->
        <input type="text" class="time-input" value="[${Math.floor(currentTime / 60)}:${(currentTime % 60).toFixed(2)}]" />
        <input type="text" class="lyrics-input" value="" />
        <button class="update-time-btn">更新時間</button>
        <button class="delete-btn">刪除</button> <!-- 新增刪除按鈕 -->
    `;

    const lyricsItems = Array.from(lyricsList.children);
    let inserted = false;

    // 尋找插入位置
    for (let i = 0; i < lyricsItems.length; i++) {
        const timeInput = lyricsItems[i].querySelector('.time-input');
        const match = timeInput.value.match(/\[(\d+):(\d+\.\d+)\]/);
        if (match) {
            const itemTime = parseInt(match[1], 10) * 60 + parseFloat(match[2]);

            if (itemTime > currentTime && !inserted) {
                lyricsList.insertBefore(emptyLine, lyricsItems[i]);
                inserted = true;
                break;
            }
        }
    }

    // 如果沒有找到插入位置，就將空行添加到末尾
    if (!inserted) {
        lyricsList.appendChild(emptyLine);
    }

    // 重新排序歌詞項目
    sortLyricsList();
});

// 排序歌詞列表
function sortLyricsList() {
    const lyricsItems = Array.from(lyricsList.children);

    // 根據時間對歌詞項目進行排序
    lyricsItems.sort((a, b) => {
        const timeA = a.querySelector('.time-input').value.match(/\[(\d+):(\d+\.\d+)\]/);
        const timeB = b.querySelector('.time-input').value.match(/\[(\d+):(\d+\.\d+)\]/);

        if (timeA && timeB) {
            const timeASeconds = parseInt(timeA[1], 10) * 60 + parseFloat(timeA[2]);
            const timeBSeconds = parseInt(timeB[1], 10) * 60 + parseFloat(timeB[2]);

            return timeASeconds - timeBSeconds;
        }
        return 0;
    });

    // 清空列表並重新添加排序後的歌詞項目
    lyricsList.innerHTML = '';
    lyricsItems.forEach((item, index) => {
        item.dataset.index = index; // 根據排序後的索引更新 data-index
        lyricsList.appendChild(item);
    });
}
</script>
<template>
    <div id="lyrics-container" class="lyrics-container">
        <div id="top">
            <input type="file" id="upload-audio" accept="audio/*,video/*">
            <audio id="audio" controls> 您的瀏覽器不支援 audio 標籤。 </audio>
            <div class="controls">
                <button id="insert-empty-line">根據當前時間插入空行</button>
                <button id="rewind-5">⏪ -5秒</button>
                <button id="rewind-1">⏪ -1秒</button>
                <button id="rewind-0.5">⏪ -0.5秒</button>
                <button id="forward-0.5">⏩ +0.5秒</button>
                <button id="forward-1">⏩ +1秒</button>
                <button id="forward-5">⏩ +5秒</button>
                <button id="generate-btn" class="download-btn">生成並下載 LYC</button>
                <a id="download-link" style="display: none;">下載 LYC 檔案</a>
            </div>
        </div>
        <textarea id="lyrics-input" placeholder="每行輸入一段歌詞" rows="6" style="width: 80%;"></textarea>
        <button id="load-lyrics-btn">載入歌詞</button>
        <h3>編輯歌詞和時間</h3>
        <div id="lyrics-list"></div>
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
