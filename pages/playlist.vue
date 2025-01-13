<script setup>
useHead({ script: [{ src: "https://www.youtube.com/iframe_api" }] });
useTitle().set("歌單播放器");
const dark = useDark()
let player

const currentTime = ref(0)
/** @type {Ref<HTMLDivElement>} type - description */
const lyricsRef = ref()
const lineHeight = 30

const playlists = reactive([
  {
    title: "夢と葉桜",
    videoId: "g3ngrh-oI1A",
    lyric: `
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
[03:25.14] 忘れられない言葉`
  },
  {
    title: "漫夜",
    videoId: "CgaBZ4pQehI",
    lyric: `
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
[02:56.23] 獨自一人在夢裡逗留 任思念出走`
  },
  {
    title: "Eyes On Me",
    videoId: "bjhVRTXQFXA",
    lyric: `
[00:24.56] Whenever sang my songs
[00:29.84] On the stage , on my own
[00:36.19] Whenever said my words
[00:41.01] Wishing they would be heard
[00:46.09] I saw you smiling at me
[00:51.52] Was it real or just my fantasy
[00:56.97] You'd always be there in the corner
[01:02.13] Of this tiny little bar
[01:07.04] My last night here for you
[01:13.58] same old songs , just once more
[01:18.65] My last night here with you？
[01:23.94] Maybe yes, maybe no
[01:28.95] I kind of liked it your way
[01:34.08] How you shyly placed your eyes on me
[01:39.43] Oh, did you ever know ?
[01:44.06] That I had mine on you
[01:52.03] Darling , so there you are
[01:57.06] With that look on your face
[02:03.32] As if you're never hurt
[02:07.49] As if you're never down
[02:12.86] Shall I be the one for you
[02:18.49] Who pinches you softly but sure
[02:24.52] If frown is shown then
[02:27.23] I will know that you are no dreamer
[02:36.03] 
[03:02.04] So let me come to you
[03:08.25] Close as I wanted to be
[03:13.57] Close enough for me
[03:18.00] To feel your heart beating fast
[03:23.29] And stay there as I whisper
[03:28.16] How I love your peaceful eyes on me
[03:35.25] Did you ever know ?
[03:39.03] That I had mine on you
[03:47.33] Darling , so share with me
[03:52.00] Your love if you have enough
[03:57.35] Your tears if you're holding back
[04:02.06] Or pain if that's what it is
[04:08.62] How can I let you know
[04:13.07] I'm more than the dress and the voice
[04:19.94] Just reach me out then
[04:22.08] You will know that you're not dreaming
[04:30.14] Darling , so there you are
[04:35.08] With that look on your face
[04:40.67] As if you're never hurt
[04:45.67] As if you're never down
[04:50.01] Shall I be the one for you
[04:56.07] Who pinches you softly but sure
[05:02.66] If frown is shown then
[05:04.24] I will know that you are no dreamer`
  },
  {
    title: "フクロウ~フクロウが知らせる客が来たと~",
    videoId: "_7Q1ZsFzgw8",
    lyric: `
[00:26.57]ようこそ　深い森の奥
[00:32.06] 珍しいお客さんね
[00:38.52] 悪いけど　ここから先では
[00:43.56] 森でマナーがあるの
[00:50.05] ほーほーフクロウが知らせる
[00:56.03] ほーほー客が来たと
[01:01.57] ほーほーフクロウが知らせる
[01:07.05] 何かが始まる予感
[01:12.26] 
[01:24.05] ラーウ　ラウー　何が見たいの
[01:30.04] ラーウ　ラウー　あなた次第
[01:36.07] 悪いけど　ここではあなたは
[01:41.76] 招かれざる客なの
[01:47.57] ほーほーフクロウが知らせる
[01:53.03] ほーほー客が来たと
[01:59.04] ほーほーフクロウが知らせる
[02:04.57] 何かが始まる予感
[02:10.00] ほーほー
[03:02.61] ラーウ　ラウー　何が見たいの
[03:08.35] ラーウ　ラウー　あなた次第
[03:14.03] 悪いけど　ここではあなたは
[03:19.90] 招かれざる客なの
[03:25.57] ほーほーフクロウが知らせる
[03:31.03] ほーほー客が来たと
[03:37.02] ほーほーフクロウが知らせる
[03:42.02] 何かが始まる予感
[03:47.39] ほーほー
[04:11.99] ほーほーフクロウが知らせる
[04:17.04] ほーほー客が来たと
[04:23.63] ほーほーフクロウが知らせる
[04:28.59] 何かが始まる予感
[04:34.01] 何かが始まる予感
[04:40.01] 何かが始まる予感`
  },
  {
    title: "忘れじの言の葉",
    videoId: "598yezPqKIQ",
    lyric: `
[00:11.03] 言の葉を紡いで
[00:16.64] 微睡んだ泡沫
[00:22.18] 旅人迷い込む
[00:27.13] 御伽の深い霧
[00:32.00] 差し伸べた手のひら
[00:37.51] そっと触れる予感
[00:43.29] 受け止めて零れた
[00:48.50] 光の一滴
[00:54.43] 
[01:02.00] 面影を募って
[01:07.03] 微笑んだ幻
[01:12.94] 想いの果てる場所
[01:18.02] まだ遥か遠くて……
[01:23.06] 求め探して彷徨ってやがて詠われて
[01:28.51] 幾千、幾万幾億の旋律となる
[01:33.87] いつか失い奪われて消える運命でも
[01:39.06] それは忘れられる事なき物語 
[01:47.64] 
[01:55.08] 指先を絡めて
[02:00.17] 触れる誰かの夢
[02:05.41] 刻まれた想いの
[02:11.02] 言霊だけが響く
[02:16.70] 言の葉を紡いで
[02:21.68] 微睡んだ泡沫
[02:27.57] 旅人の名前を 
[02:32.34] おとぎ話と言う 
[02:39.92] 
[02:48.03] 求め探して彷徨うてやがて道となり
[02:54.01] 幾千、幾万幾億の英雄は往く
[02:59.32] いつか失い奪われて消える運命でも
[03:04.47] それは忘れられることなく此処にある
[03:09.70] 求め探して彷徨うてやがて詠われて
[03:15.09] 幾千、幾万幾億の旋律となる
[03:20.50] いつか失い奪われて 消える運命でも
[03:25.56] それは忘れられることなき物語`
  },
  {
    title: "金魚花火",
    videoId: "Ye3iQ_PuyBA",
    lyric: `
[00:25.36] 心に泳ぐ 金魚は
[00:31.23] 恋し 想いを 募らせて
[00:38.06] 真っ赤に 染まり 実らぬ 想いを
[00:44.52] 知りながら それでも
[00:48.04] そばにいたいと 願ったの
[00:57.45] 夏の匂い 雨の中で
[01:04.05] ぽたぽたおちる 金魚花火
[01:10.56] 光で 目がくらんで
[01:17.31] 一瞬うつるは あなたの優顔
[01:28.41] 
[01:49.07] 心に泳ぐ 金魚は
[01:55.92] 醜さで 包まれぬよう
[02:02.50] この夏だけの 命と 決めて
[02:09.15] 少しの 時間だけでも
[02:12.79] あなたの 幸せを 願ったの
[02:22.26] 夏の匂い 夜が包んで
[02:28.64] ぽたぽたおちる 金魚花火
[02:35.11] どんな言葉にも できない
[02:41.05] 一瞬うつるの あなたの優顔
[02:52.32] 
[03:01.01] 夏の匂い 雨の中で
[03:08.47] 
[03:13.83] 夏の匂い 雨の中で
[03:21.16] 
[03:26.50] 夏の匂い 雨の中で
[03:33.08] ぽたぽたおちる 金魚花火
[03:40.02] 光で 目がくらんで
[03:46.07] 一瞬うつるは あなたの優顔
[03:52.73] 夏の匂い 夜が包んで
[03:59.45] ぽたぽたおちる 金魚花火
[04:05.85] どんな言葉にも できない
[04:12.30] 一瞬うつるの あなたの優顔`
  },
  {
    title: "For フルーツバスケット",
    videoId: "tb8F54xweuA",
    lyric: `
[00:17.01] とてもうれしかったよ
[00:20.99] 君が笑いかけてた
[00:24.05] すべてを溶かす微笑みで
[00:31.12] 春はまだ遠くて つめたい土の中で
[00:38.56] 芽吹く瞬間(とき)を待ってたんだ
[00:44.00] たとえば苦しい今日だとしても
[00:47.72] 昨日の傷を残していても
[00:51.36] 信じたい 心ほどいてゆけると
[00:58.13] 生まれ変わることはできないよ
[01:01.50] だけど変わってはいけるから
[01:06.07] Let's stay together いつも
[01:13.35] 
[01:27.05] 僕だけに笑って その指で ねえ触って
[01:34.28] 望みばかりが果てしなく
[01:41.50] やさしくしたいよ もう悔やまぬように
[01:48.06] 嘆きの海も越えていこう
[01:53.87] たとえ苦しい今日だとしても
[01:57.11] いつかあたたかな想い出になる
[02:01.26] 心ごとすべてなげだせたなら
[02:07.59] ここに生きてる意味がわかるよ
[02:11.28] 生まれおちた歓びを知る
[02:15.59] Let's stay together いつも
[02:21.78] 
[02:56.38] たとえば苦しい今日だとしても
[03:00.06] いつかあたたかな想い出になる
[03:03.54] 心ごとすべてなげだせたなら
[03:10.09] ここに生きてる意味がわかるよ
[03:13.78] 生まれおちた歓びを知る
[03:18.05] Let's stay together いつも`
  },
  {
    title: "月光",
    videoId: "l7hwGGDr5ew",
    lyric: `
[00:01.54] 彎彎月光下 蒲公英在遊盪
[00:06.10] 像煙花閃著微亮的光芒
[00:11.51] 趁著夜晚 找尋幸福方向 難免會受傷
[00:22.01] 彎彎小路上 蒲公英在歌唱
[00:27.06] 星星照亮 在起風的地方
[00:32.28] 乘著微風 飄向未知遠方 幸福路也許漫長
[00:43.87] 難過的時候 誰在身邊 陪我掉眼淚
[00:53.07] 失敗無所謂 你在左右 月光多美
[01:00.53] 彎彎月光下 我輕輕在歌唱
[01:05.58] 從今以後 不會再悲傷
[01:10.07] 閉上雙眼 感覺你在身旁
[01:15.56] 你是溫暖月光 你是幸福月光
[01:26.43] 
[01:42.01] 彎彎月光下 蒲公英在遊盪
[01:46.50] 像煙花閃著微亮的光芒
[01:51.54] 趁著夜晚 找尋幸福方向 難免會受傷
[02:01.01] 彎彎小路上 蒲公英在歌唱
[02:05.80] 星星照亮 在起風的地方
[02:10.59] 乘著微風 飄向未知遠方 幸福路也許漫長
[02:22.50] 難過的時候 誰在身邊 陪我掉眼淚
[02:31.98] 失敗無所謂 你在左右 月光多美
[02:39.51] 彎彎月光下 我輕輕在歌唱
[02:44.54] 從今以後 不會再悲傷
[02:49.08] 閉上雙眼 感覺你在身旁
[02:54.81] 你是溫暖月光 你是幸福月光
[03:06.03] 
[03:21.08] 彎彎月光下 我輕輕在歌唱
[03:26.09] 從今以後 不會再悲傷
[03:30.50] 閉上雙眼 感覺你在身旁
[03:36.56] 你是溫暖月光 你是幸福月光`
  },
  {
    title: "檄！帝國華擊團",
    videoId: "3KNmAjRmd40",
    lyric: `

`
  },
  {
    title: "檄！帝國華擊團",
    videoId: "3KNmAjRmd40",
    lyric: `
[00:20.90] 引き裂いた　闇が吠え
[00:24.59] 震える帝都に
[00:28.21] 愛の歌　高らかに
[00:31.00] 踴り出る戦士たち
[00:34.93] 心まで　鋼鉄に
[00:38.00] 武裝する乙女
[00:41.28] 悪を蹴散らして
[00:44.56] 正義をしめすのだ
[00:49.14] 走れ　光速の 帝國華撃団
[00:55.50] 唸れ　衝撃の 帝國華撃団
[01:04.56] 
[01:37.09] 「わたしたち　正義のために戦います」
[01:40.40] 「たとえ　それが命をかける戦いであっても」
[01:43.67] 「あたいたちは　一歩も引かないぜ！」
[01:46.17] 「それが　帝國華撃団なのです！」
[01:50.53] 街の燈が　消え果てて
[01:53.95] 脅える帝都に
[01:57.46] 虹の色　染め上げて
[02:00.40] 躍り出る戦士たち
[02:03.99] 暁に　激情を
[02:07.49] 照らし出す乙女
[02:10.80] 悪を滅ぼして
[02:14.03] 正義をしめすのだ
[02:18.19] 走れ　光速の 帝國華撃団
[02:25.31] 唸れ　衝撃の 帝國華撃団
[02:32.18] 走れ　光速の 帝國華撃団
[02:38.66] 唸れ　衝撃の 帝國華撃団`
  },
  {
    title: "Let it Snow",
    videoId: "kB5XK0BbxYE",
    lyric: `
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
  },
  {
    title: "桃花諾",
    videoId: "1h0oYsSw8-E",
    lyric: `
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
[03:10.54] 回憶斑斑留在愛你的路`
  },
  {
    title: "左手指月",
    videoId: "qDGI4_a6wi0",
    lyric: `
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
[03:34.04] 你是我 無二無別`
  },
].map(x => ({
  ...x, lyric: x.lyric.trim().split("\n").map(l => l.slice(1).split("]")).map(l => {
    let n = l[0].split(":").map(Number)
    console.log(l[1]?.length);

    return { time: n[0] * 60 + n[1], text: l[1] }
  })
})))
const current = ref(0)
// 初始化播放器
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: nextSong(nextId()),
    playerVars: { autoplay: 1, controls: 1 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

function onPlayerReady() {
  player.playVideo()
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    selectSong(nextId())
  }
}

function nextId() {
  return Math.floor(Math.random() * playlists.length)
}

// 切換歌曲
function nextSong(id) {
  return playlists[current.value = id].videoId
}

function selectSong(id) {
  player.loadVideoById(nextSong(id))
}

// 自動滾動歌詞
function updateLyricsScroll() {
  const matchedLine = playlists[current.value].lyric.findIndex(line => line.time > currentTime.value) - 1
  if (matchedLine >= 0) {
    // 計算當前行的偏移量
    if (lyricsRef.value) {
      const scrollPosition = (matchedLine - 1) * lineHeight
      // 設置滾動位置
      for (let i = 0; i < lyricsRef.value.children.length; i++) {
        const element = lyricsRef.value.children.item(i)
        element.style.top = `-${scrollPosition}px`
      }
    }
  }
}

onMounted(() => {
  onYouTubeIframeAPIReady()
  // 定時更新當前播放時間
  const interval = setInterval(() => {
    if (!player?.getCurrentTime) return
    currentTime.value = player.getCurrentTime()
    updateLyricsScroll()
  }, 100)
  // 清除 interval
  onBeforeUnmount(() => { clearInterval(interval) })
})
</script>

<template>
  <div class="player-container" style="display: flex; justify-content: center;">
    <div class="video-container">
      <h1>{{ playlists[current].title }}</h1>

      <div id="player"></div>

      <ul class="lyrics-container" ref="lyricsRef">
        <li v-for="(line, index) in playlists[current].lyric" :key="index"
          :class="{ active: currentTime >= line.time && currentTime < (playlists[current].lyric[index + 1]?.time || Infinity) }"
          class="lyric-line" :style="{ position: 'relative', top: `${(index - matchedLine) * lineHeight}px` }">
          {{ line.text }}
        </li>
      </ul>
    </div>
    <div class="title-container">
      <h1 style="text-align: center;">歌單</h1>
      <div>
        <v-btn class="song-btn" :class="{ active: dark.data ? current == index : current != index }"
          style="display: block; margin: 3px;" v-for="(item, index) in playlists" :key="index"
          @click="selectSong(index)">{{ item.title }}</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  text-align: left;
  margin: 0px 20px;
}

.player-container {
  text-align: center;
  margin: 20px auto;
}

.lyrics-container {
  width: 100%;
  height: 150px;
  margin: 15px auto;
  color: darkgrey;
  font-size: 14px;
  position: relative;
  overflow: hidden;
}

.lyric-line {
  transition: top 1.0s ease-out;
  line-height: 30px;
  font-size: 18px;
  color: #666;
}

.song-btn.active {
  color: #2b52ff;
}

.lyric-line.active {
  color: #2b52ff;
  font-weight: bold;
}
</style>
