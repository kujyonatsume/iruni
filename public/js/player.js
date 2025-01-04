let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player, videoID, result
let videotime = 0;
let lineNo = 0;
let preLine = 1;
let lineHeight = -30;

const items = {
    "kB5XK0BbxYE": `[ti: Let It Snow][ar: 祈iruni]
[00:07.74] Oh, the weather outside is frightful
[00:10.97] But the fire is so delightful
[00:14.11] And since we've no place to go
[00:17.73] Let it snow, let it snow, let it snow
[00:21.73] Oh, it doesn't show signs of stopping
[00:24.96] And I've bought some corn for popping
[00:28.30] The lights are turned way down low
[00:31.71] Let it snow, let it snow, let it snow
[00:34.99] When we finally kiss goodnight
[00:38.33] How I'll hate going out in the storm
[00:42.25] But if you'll really hold me tight
[00:45.77] All the way home I'll be warm
[00:49.49] Oh, the fire is slowly dying
[00:52.81] And, my dear, we're still goodbye-ing
[00:56.38] But as long as you love me so
[00:59.94] Let it snow, let it snow, and snow
[01:03.67]
[01:17.61] When we finally kiss goodnight
[01:20.49] How I'll hate going out in the storm
[01:24.07] But if you'll really hold me tight
[01:27.98] All the way home I'll be warm
[01:31.50] The fire is slowly dying
[01:34.79] And, my dear, we're still goodbye-ing
[01:38.47] But as long as you love me so
[01:41.93] Let it snow, Let it snow, and snow`
}

const lists = Object.entries(items);

switchVideo()

function setupVideoAndLyrics() {
    const [videoID, lyric] = lists[Math.floor(Math.random() * lists.length)];
    let result = parseLyric(lyric);

    // Clear previous lyrics
    const bg = document.querySelector(".bg");
    bg.innerHTML = "";

    let ul = document.createElement("ul");
    for (let i = 0; i < result.length; i++) {
        let li = document.createElement("li");
        li.textContent = result[i].content;
        ul.appendChild(li);
    }
    bg.appendChild(ul);

    return { videoID, result };
}


function onYouTubeIframeAPIReady() {
    player = new YT.Player("ytplayer", {
        videoId: videoID,
        events: {
            onReady(event) {
                event.target.playVideo();
                function updateTime() {
                    if (player && player.getCurrentTime) {
                        videotime = player.getCurrentTime();
                        videoTimeUpdater();
                    }
                }
                timeupdater = setInterval(updateTime, 100);
            },
            onStateChange(event) {
                if (event.data === YT.PlayerState.ENDED) {
                    switchVideo();
                }
            }
        }
    });
}

function parseLyric(lyric) {
    let lyricArr = lyric.split("\n");
    let result = [];
    for (let i = 0; i < lyricArr.length; i++) {
        let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);
        let lineLyric = "";
        if (lyricArr[i].split(playTimeArr).length > 0) {
            lineLyric = lyricArr[i].split(playTimeArr);
        }
        if (playTimeArr != null) {
            for (let j = 0; j < playTimeArr.length; j++) {
                let time = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":");
                result.push({
                    time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
                    content: lineLyric.slice(1)
                });
            }
        }
    }
    return result;
}

function highLight() {
    let lis = document.querySelectorAll("li");
    for (let i = 0; i < lis.length; i++) {
        if (i === lineNo) {
            lis[i].classList.add("active");
        } else {
            lis[i].classList.remove("active");
        }
    }
    if (lineNo > preLine) {
        let ul = document.querySelector("ul");
        ul.style.transition = "top 0.5s ease-in-out";
        ul.style.top = (lineNo - preLine) * lineHeight + "px";
    }
}

function videoTimeUpdater() {
    if (lineNo === result.length) return;
    const firstLi = document.querySelector("li");
    if (firstLi && firstLi.classList.contains("active")) {
        const ul = document.querySelector("ul");
        ul.style.top = "0";
    }
    lineNo = getLineNo(videotime);
    highLight();
    lineNo++;
}

function getLineNo(videotime) {
    if (videotime >= parseFloat(result[lineNo].time)) {
        for (let i = result.length - 1; i >= lineNo; i--) {
            if (videotime >= parseFloat(result[i].time)) {
                return i;
            }
        }
    } else {
        for (let i = 0; i <= lineNo; i++) {
            if (videotime <= parseFloat(result[i].time)) {
                return i - 1;
            }
        }
    }
}

function switchVideo() {
    // Stop current video
    if (player) player.destroy();

    // Reset state
    lineNo = 0;
    preLine = 1;
    videotime = 0;

    // Setup new video and lyrics
    ({ videoID, result } = setupVideoAndLyrics());

    // Reinitialize YouTube player
    onYouTubeIframeAPIReady();
}