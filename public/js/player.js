let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player, videoID, result
let videotime = 0;
let lineNo = 0;
let preLine = 1;
let lineHeight = -30;

const lists = [
    ["g3ngrh-oI1A", `
[00:28.37] この川の流れるが如く
[00:34.07] 穏やかに音色が聞こえる
[00:40.11] 吹く風が頬を撫でていく
[00:46.36] 懐かしい思いでが滲む
[00:51.51] 遙かなる空は
[00:57.06] 胸を裂くように
[01:04.01] 忘れかけた記憶を醒ます
[01:11.03] 溢れるは涙
[01:16.34] 白い桜の花の季節は
[01:22.07] 遠く夢の中にだけ
[01:28.37] 舞い散る花びらの囁いた
[01:35.20] 忘れられない言葉
[01:41.35] 
[01:54.06] 眠れない夜を一人きり
[02:00.02] 歩き出す　ぬるい風の中
[02:06.23] いたずらに　はしゃいでいたまま
[02:12.74] 気がつけば　思い出に変わる
[02:17.27] 月も雲隠れ
[02:24.40] 蒸し暑い日々の
[02:30.47] 消したい記憶も儚くは
[02:37.54] 止まらない涙
[02:42.12] 刻まれる時間は残酷に
[02:48.54] ヒトを縛りつけ遊ぶ
[02:55.04] 青々と茂る桜の葉は
[03:01.40] 何も語りはしない
[03:07.00] 白い桜の花の季節は
[03:13.65] 遠く夢の中にだけ
[03:19.18] 舞い散る花びらの囁いた
[03:25.14] 忘れられない言葉`],

    ["CgaBZ4pQehI", `
[00:20.43] 適應著規則
[00:23.03] 學習跟上腳步 還不習慣的節奏
[00:29.12] 螢幕黯淡了
[00:32.18] 倒映著多少寂寞的臉孔 還放不下什麼
[00:38.68] 生活太荒謬 沒準備好接受
[00:43.03] 突然的愧疚 不想照單全收
[00:48.86] 跌跌撞撞地走 磨平稜角以後
[00:52.01] 還剩下什麼 不如睡飽再說
[00:56.04] 閉上眼 旋律盤旋在腦海之中
[01:01.06] 是不是 就能讓今天份的後悔都失蹤
[01:07.02] 睜開眼 指針走到右側的時鐘
[01:10.54] 孤身一人迷失了的夢 任思緒遊走
[01:18.90] 
[01:27.16] 我在這頭凝望 你身上的偽裝
[01:31.22] 是什麼故事仍然被隱藏
[01:36.31] 哪一天我們才能學會不再說謊
[01:41.44] 也不再需要模仿
[01:46.05] 城市太沉默 彷彿只剩下我
[01:51.23] 心跳聲寂寞 像你在耳邊說
[01:56.20] 喋喋不休指控 是誰和誰的錯
[02:00.51] 不如就放手 煩惱高飛遠走
[02:04.74] 
[02:23.04] 閉上眼 旋律盤旋在腦海之中
[02:27.09] 是不是 就能讓今天份的後悔都失蹤
[02:33.07] 睜開眼 指針走到右側的時鐘
[02:37.47] 孤身一人迷失了的夢
[02:43.07] 睜開眼 旋律反覆的哼在口中
[02:47.02] 能不能 讓束縛著的昨天全部都自由
[02:52.00] 閉上眼 指針消失在黑暗之中
[02:56.23] 獨自一人在夢裡逗留 任思念出走`],

    ["kB5XK0BbxYE", `
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
    ],

    ["1h0oYsSw8-E", `
[00:19.00] 初見若繾綣誓言風吹雲舒捲
[00:26.08] 歲月間問今夕又何年
[00:32.49] 心有犀但願執念輪迴過經年
[00:40.26] 彈指間繁花開落多少遍
[00:46.82] 這一世牽絆糾結觸動了心弦
[00:53.93] 下一世不知可否再見
[01:00.53] 留一片桃花紀念了卻浮生緣
[01:07.76] 眉目間還有我的思念
[01:14.35] 一寸土一年木 一花一樹一貪圖
[01:20.98] 情是種愛偏開在迷途
[01:28.16] 忘前路忘舊物 忘心忘你忘最初
[01:34.69] 花斑斑留在愛你的路
[01:43.98] 
[01:54.70] 這一世牽絆糾結觸動了心弦
[02:02.01] 下一世不知可否再見
[02:08.91] 留一片桃花紀念了卻浮生緣
[02:16.03] 眉目間還有我的思念
[02:22.70] 一寸土一年木 一花一樹一貪圖
[02:29.69] 情是種愛偏開在迷途
[02:36.52] 忘前路忘舊物 忘心忘你忘最初
[02:43.53] 花斑斑留在愛你的路
[02:50.14] 虔誠夙願來世路 一念桃花因果渡
[02:57.21] 那一念幾闕時光在重複
[03:03.80] 聽雨書望天湖 人間寥寥情難訴
[03:10.54] 回憶斑斑留在愛你的路`],

    ["qDGI4_a6wi0", `
[00:24.28] 左手握大地右手握著天
[00:31.08] 掌紋裂出了十方的閃電
[00:37.46] 把時光匆匆兌換成了年
[00:43.90] 三千世 如所不見
[00:51.07] 左手拈著花右手舞著劍
[00:57.73] 眉間落下了一萬年的雪
[01:03.09] 一滴淚 啊啊啊
[01:10.06] 那是我 啊啊啊
[01:18.16] 
[01:43.07] 左手一彈指右手彈著弦
[01:50.07] 舟楫擺渡在忘川的水間
[01:56.21] 當煩惱能開出一朵紅蓮
[02:02.02] 莫停歇 給我雜念
[02:09.08] 左手指著月右手取紅線
[02:16.29] 賜予你和我如願的情緣
[02:22.03] 月光中 啊啊啊
[02:29.10] 你和我 啊啊啊
[02:37.33] 
[02:49.22] 左手化成羽右手成鱗片
[02:55.50] 某世在雲上某世在林間
[03:01.52] 願隨你用一粒微塵的模樣
[03:08.02] 在所有 塵世浮現
[03:15.08] 我左手拿起你右手放下你
[03:22.15] 合掌時你全部被收回心間
[03:28.00] 一炷香 啊啊啊
[03:34.04] 你是我 無二無別`],

]

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