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
    "title": "夢と葉桜",
    "videoId": "g3ngrh-oI1A",
    "lyric": `[00:28.37] この川の流れるが如く\n[00:34.07] 穏やかに音色が聞こえる\n[00:40.11] 吹く風が頬を撫でていく\n[00:46.36] 懐かしい思いでが滲む\n[00:51.51] 遙かなる空は\n[00:57.06] 胸を裂くように\n[01:04.01] 忘れかけた記憶を醒ます\n[01:11.03] 溢れるは涙\n[01:16.34] 白い桜の花の季節は\n[01:22.07] 遠く夢の中にだけ\n[01:28.37] 舞い散る花びらの囁いた\n[01:35.20] 忘れられない言葉\n[01:41.35] \n[01:54.06] 眠れない夜を一人きり\n[02:00.02] 歩き出す　ぬるい風の中\n[02:06.23] いたずらに　はしゃいでいたまま\n[02:12.74] 気がつけば　思い出に変わる\n[02:17.27] 月も雲隠れ\n[02:24.40] 蒸し暑い日々の\n[02:30.47] 消したい記憶も儚くは\n[02:37.54] 止まらない涙\n[02:42.12] 刻まれる時間は残酷に\n[02:48.54] ヒトを縛りつけ遊ぶ\n[02:55.04] 青々と茂る桜の葉は\n[03:01.40] 何も語りはしない\n[03:07.00] 白い桜の花の季節は\n[03:13.65] 遠く夢の中にだけ\n[03:19.18] 舞い散る花びらの囁いた\n[03:25.14] 忘れられない言葉`
  },
  {
    "title": "漫夜",
    "videoId": "CgaBZ4pQehI",
    "lyric": `[00:20.43] 適應著規則\n[00:23.03] 學習跟上腳步 還不習慣的節奏\n[00:29.12] 螢幕黯淡了\n[00:32.18] 倒映著多少寂寞的臉孔 還放不下什麼\n[00:38.68] 生活太荒謬 沒準備好接受\n[00:43.03] 突然的愧疚 不想照單全收\n[00:48.86] 跌跌撞撞地走 磨平稜角以後\n[00:52.01] 還剩下什麼 不如睡飽再說\n[00:56.04] 閉上眼 旋律盤旋在腦海之中\n[01:01.06] 是不是 就能讓今天份的後悔都失蹤\n[01:07.02] 睜開眼 指針走到右側的時鐘\n[01:10.54] 孤身一人迷失了的夢 任思緒遊走\n[01:18.90] \n[01:27.16] 我在這頭凝望 你身上的偽裝\n[01:31.22] 是什麼故事仍然被隱藏\n[01:36.31] 哪一天我們才能學會不再說謊\n[01:41.44] 也不再需要模仿\n[01:46.05] 城市太沉默 彷彿只剩下我\n[01:51.23] 心跳聲寂寞 像你在耳邊說\n[01:56.20] 喋喋不休指控 是誰和誰的錯\n[02:00.51] 不如就放手 煩惱高飛遠走\n[02:04.74] \n[02:23.04] 閉上眼 旋律盤旋在腦海之中\n[02:27.09] 是不是 就能讓今天份的後悔都失蹤\n[02:33.07] 睜開眼 指針走到右側的時鐘\n[02:37.47] 孤身一人迷失了的夢\n[02:43.07] 睜開眼 旋律反覆的哼在口中\n[02:47.02] 能不能 讓束縛著的昨天全部都自由\n[02:52.00] 閉上眼 指針消失在黑暗之中\n[02:56.23] 獨自一人在夢裡逗留 任思念出走`
  },
  {
    "title": "Eyes On Me",
    "videoId": "bjhVRTXQFXA",
    "lyric": `[00:24.56] Whenever sang my songs\n[00:29.84] On the stage , on my own\n[00:36.19] Whenever said my words\n[00:41.01] Wishing they would be heard\n[00:46.09] I saw you smiling at me\n[00:51.52] Was it real or just my fantasy\n[00:56.97] You'd always be there in the corner\n[01:02.13] Of this tiny little bar\n[01:07.04] My last night here for you\n[01:13.58] same old songs , just once more\n[01:18.65] My last night here with you？\n[01:23.94] Maybe yes, maybe no\n[01:28.95] I kind of liked it your way\n[01:34.08] How you shyly placed your eyes on me\n[01:39.43] Oh, did you ever know ?\n[01:44.06] That I had mine on you\n[01:52.03] Darling , so there you are\n[01:57.06] With that look on your face\n[02:03.32] As if you're never hurt\n[02:07.49] As if you're never down\n[02:12.86] Shall I be the one for you\n[02:18.49] Who pinches you softly but sure\n[02:24.52] If frown is shown then\n[02:27.23] I will know that you are no dreamer\n[02:36.03] \n[03:02.04] So let me come to you\n[03:08.25] Close as I wanted to be\n[03:13.57] Close enough for me\n[03:18.00] To feel your heart beating fast\n[03:23.29] And stay there as I whisper\n[03:28.16] How I love your peaceful eyes on me\n[03:35.25] Did you ever know ?\n[03:39.03] That I had mine on you\n[03:47.33] Darling , so share with me\n[03:52.00] Your love if you have enough\n[03:57.35] Your tears if you're holding back\n[04:02.06] Or pain if that's what it is\n[04:08.62] How can I let you know\n[04:13.07] I'm more than the dress and the voice\n[04:19.94] Just reach me out then\n[04:22.08] You will know that you're not dreaming\n[04:30.14] Darling , so there you are\n[04:35.08] With that look on your face\n[04:40.67] As if you're never hurt\n[04:45.67] As if you're never down\n[04:50.01] Shall I be the one for you\n[04:56.07] Who pinches you softly but sure\n[05:02.66] If frown is shown then\n[05:04.24] I will know that you are no dreamer`
  },
  {
    "title": "フクロウ~フクロウが知らせる客が来たと~",
    "videoId": "_7Q1ZsFzgw8",
    "lyric": `[00:26.57]ようこそ　深い森の奥\n[00:32.06] 珍しいお客さんね\n[00:38.52] 悪いけど　ここから先では\n[00:43.56] 森でマナーがあるの\n[00:50.05] ほーほーフクロウが知らせる\n[00:56.03] ほーほー客が来たと\n[01:01.57] ほーほーフクロウが知らせる\n[01:07.05] 何かが始まる予感\n[01:12.26] \n[01:24.05] ラーウ　ラウー　何が見たいの\n[01:30.04] ラーウ　ラウー　あなた次第\n[01:36.07] 悪いけど　ここではあなたは\n[01:41.76] 招かれざる客なの\n[01:47.57] ほーほーフクロウが知らせる\n[01:53.03] ほーほー客が来たと\n[01:59.04] ほーほーフクロウが知らせる\n[02:04.57] 何かが始まる予感\n[02:10.00] ほーほー\n[03:02.61] ラーウ　ラウー　何が見たいの\n[03:08.35] ラーウ　ラウー　あなた次第\n[03:14.03] 悪いけど　ここではあなたは\n[03:19.90] 招かれざる客なの\n[03:25.57] ほーほーフクロウが知らせる\n[03:31.03] ほーほー客が来たと\n[03:37.02] ほーほーフクロウが知らせる\n[03:42.02] 何かが始まる予感\n[03:47.39] ほーほー\n[04:11.99] ほーほーフクロウが知らせる\n[04:17.04] ほーほー客が来たと\n[04:23.63] ほーほーフクロウが知らせる\n[04:28.59] 何かが始まる予感\n[04:34.01] 何かが始まる予感\n[04:40.01] 何かが始まる予感`
  },
  {
    "title": "忘れじの言の葉",
    "videoId": "598yezPqKIQ",
    "lyric": `[00:11.03] 言の葉を紡いで\n[00:16.64] 微睡んだ泡沫\n[00:22.18] 旅人迷い込む\n[00:27.13] 御伽の深い霧\n[00:32.00] 差し伸べた手のひら\n[00:37.51] そっと触れる予感\n[00:43.29] 受け止めて零れた\n[00:48.50] 光の一滴\n[00:54.43] \n[01:02.00] 面影を募って\n[01:07.03] 微笑んだ幻\n[01:12.94] 想いの果てる場所\n[01:18.02] まだ遥か遠くて……\n[01:23.06] 求め探して彷徨ってやがて詠われて\n[01:28.51] 幾千、幾万幾億の旋律となる\n[01:33.87] いつか失い奪われて消える運命でも\n[01:39.06] それは忘れられる事なき物語 \n[01:47.64] \n[01:55.08] 指先を絡めて\n[02:00.17] 触れる誰かの夢\n[02:05.41] 刻まれた想いの\n[02:11.02] 言霊だけが響く\n[02:16.70] 言の葉を紡いで\n[02:21.68] 微睡んだ泡沫\n[02:27.57] 旅人の名前を \n[02:32.34] おとぎ話と言う \n[02:39.92] \n[02:48.03] 求め探して彷徨うてやがて道となり\n[02:54.01] 幾千、幾万幾億の英雄は往く\n[02:59.32] いつか失い奪われて消える運命でも\n[03:04.47] それは忘れられることなく此処にある\n[03:09.70] 求め探して彷徨うてやがて詠われて\n[03:15.09] 幾千、幾万幾億の旋律となる\n[03:20.50] いつか失い奪われて 消える運命でも\n[03:25.56] それは忘れられることなき物語`
  },
  {
    "title": "金魚花火",
    "videoId": "Ye3iQ_PuyBA",
    "lyric": `[00:25.36] 心に泳ぐ 金魚は\n[00:31.23] 恋し 想いを 募らせて\n[00:38.06] 真っ赤に 染まり 実らぬ 想いを\n[00:44.52] 知りながら それでも\n[00:48.04] そばにいたいと 願ったの\n[00:57.45] 夏の匂い 雨の中で\n[01:04.05] ぽたぽたおちる 金魚花火\n[01:10.56] 光で 目がくらんで\n[01:17.31] 一瞬うつるは あなたの優顔\n[01:28.41] \n[01:49.07] 心に泳ぐ 金魚は\n[01:55.92] 醜さで 包まれぬよう\n[02:02.50] この夏だけの 命と 決めて\n[02:09.15] 少しの 時間だけでも\n[02:12.79] あなたの 幸せを 願ったの\n[02:22.26] 夏の匂い 夜が包んで\n[02:28.64] ぽたぽたおちる 金魚花火\n[02:35.11] どんな言葉にも できない\n[02:41.05] 一瞬うつるの あなたの優顔\n[02:52.32] \n[03:01.01] 夏の匂い 雨の中で\n[03:08.47] \n[03:13.83] 夏の匂い 雨の中で\n[03:21.16] \n[03:26.50] 夏の匂い 雨の中で\n[03:33.08] ぽたぽたおちる 金魚花火\n[03:40.02] 光で 目がくらんで\n[03:46.07] 一瞬うつるは あなたの優顔\n[03:52.73] 夏の匂い 夜が包んで\n[03:59.45] ぽたぽたおちる 金魚花火\n[04:05.85] どんな言葉にも できない\n[04:12.30] 一瞬うつるの あなたの優顔`
  },
  {
    "title": "For フルーツバスケット",
    "videoId": "tb8F54xweuA",
    "lyric": `[00:17.01] とてもうれしかったよ\n[00:20.99] 君が笑いかけてた\n[00:24.05] すべてを溶かす微笑みで\n[00:31.12] 春はまだ遠くて つめたい土の中で\n[00:38.56] 芽吹く瞬間(とき)を待ってたんだ\n[00:44.00] たとえば苦しい今日だとしても\n[00:47.72] 昨日の傷を残していても\n[00:51.36] 信じたい 心ほどいてゆけると\n[00:58.13] 生まれ変わることはできないよ\n[01:01.50] だけど変わってはいけるから\n[01:06.07] Let's stay together いつも\n[01:13.35] \n[01:27.05] 僕だけに笑って その指で ねえ触って\n[01:34.28] 望みばかりが果てしなく\n[01:41.50] やさしくしたいよ もう悔やまぬように\n[01:48.06] 嘆きの海も越えていこう\n[01:53.87] たとえ苦しい今日だとしても\n[01:57.11] いつかあたたかな想い出になる\n[02:01.26] 心ごとすべてなげだせたなら\n[02:07.59] ここに生きてる意味がわかるよ\n[02:11.28] 生まれおちた歓びを知る\n[02:15.59] Let's stay together いつも\n[02:21.78] \n[02:56.38] たとえば苦しい今日だとしても\n[03:00.06] いつかあたたかな想い出になる\n[03:03.54] 心ごとすべてなげだせたなら\n[03:10.09] ここに生きてる意味がわかるよ\n[03:13.78] 生まれおちた歓びを知る\n[03:18.05] Let's stay together いつも`
  },
  {
    "title": "月光",
    "videoId": "l7hwGGDr5ew",
    "lyric": `[00:01.54] 彎彎月光下 蒲公英在遊盪\n[00:06.10] 像煙花閃著微亮的光芒\n[00:11.51] 趁著夜晚 找尋幸福方向 難免會受傷\n[00:22.01] 彎彎小路上 蒲公英在歌唱\n[00:27.06] 星星照亮 在起風的地方\n[00:32.28] 乘著微風 飄向未知遠方 幸福路也許漫長\n[00:43.87] 難過的時候 誰在身邊 陪我掉眼淚\n[00:53.07] 失敗無所謂 你在左右 月光多美\n[01:00.53] 彎彎月光下 我輕輕在歌唱\n[01:05.58] 從今以後 不會再悲傷\n[01:10.07] 閉上雙眼 感覺你在身旁\n[01:15.56] 你是溫暖月光 你是幸福月光\n[01:26.43] \n[01:42.01] 彎彎月光下 蒲公英在遊盪\n[01:46.50] 像煙花閃著微亮的光芒\n[01:51.54] 趁著夜晚 找尋幸福方向 難免會受傷\n[02:01.01] 彎彎小路上 蒲公英在歌唱\n[02:05.80] 星星照亮 在起風的地方\n[02:10.59] 乘著微風 飄向未知遠方 幸福路也許漫長\n[02:22.50] 難過的時候 誰在身邊 陪我掉眼淚\n[02:31.98] 失敗無所謂 你在左右 月光多美\n[02:39.51] 彎彎月光下 我輕輕在歌唱\n[02:44.54] 從今以後 不會再悲傷\n[02:49.08] 閉上雙眼 感覺你在身旁\n[02:54.81] 你是溫暖月光 你是幸福月光\n[03:06.03] \n[03:21.08] 彎彎月光下 我輕輕在歌唱\n[03:26.09] 從今以後 不會再悲傷\n[03:30.50] 閉上雙眼 感覺你在身旁\n[03:36.56] 你是溫暖月光 你是幸福月光`
  },
  {
    "title": "檄！帝國華擊團",
    "videoId": "3KNmAjRmd40",
    "lyric": `[00:20.90] 引き裂いた　闇が吠え\n[00:24.59] 震える帝都に\n[00:28.21] 愛の歌　高らかに\n[00:31.00] 踴り出る戦士たち\n[00:34.93] 心まで　鋼鉄に\n[00:38.00] 武裝する乙女\n[00:41.28] 悪を蹴散らして\n[00:44.56] 正義をしめすのだ\n[00:49.14] 走れ　光速の 帝國華撃団\n[00:55.50] 唸れ　衝撃の 帝國華撃団\n[01:04.56] \n[01:37.09] 「わたしたち　正義のために戦います」\n[01:40.40] 「たとえ　それが命をかける戦いであっても」\n[01:43.67] 「あたいたちは　一歩も引かないぜ！」\n[01:46.17] 「それが　帝國華撃団なのです！」\n[01:50.53] 街の燈が　消え果てて\n[01:53.95] 脅える帝都に\n[01:57.46] 虹の色　染め上げて\n[02:00.40] 躍り出る戦士たち\n[02:03.99] 暁に　激情を\n[02:07.49] 照らし出す乙女\n[02:10.80] 悪を滅ぼして\n[02:14.03] 正義をしめすのだ\n[02:18.19] 走れ　光速の 帝國華撃団\n[02:25.31] 唸れ　衝撃の 帝國華撃団\n[02:32.18] 走れ　光速の 帝國華撃団\n[02:38.66] 唸れ　衝撃の 帝國華撃団`
  },
  {
    "title": "Catch You Catch Me",
    "videoId": "HDspoXC2fPY",
    "lyric": "[00:23.07] 会いたいな 会えないな\n[00:26.12] 切ないな この気持ち\n[00:30.12] 言えないの 言いたいの\n[00:33.59] チャンス逃してばかり\n[00:38.07] だって だって 翼広げ二人で\n[00:46.01] 空をマラソン\n[00:47.93] 夢をユニゾンしたい\n[00:53.24] ほら Catch You Catch You\n[00:54.54] Catch Me Catch Me 待って\n[00:57.41] こっちをむいて スキだといって\n[00:59.93] そう Nice to Meet You Good to See You きっと\n[01:04.50] 私の想い あなたのハートに\n[01:06.61] 飛んで飛んで飛んでいけ\n[01:10.05] 迷・わ・な・い\n[01:13.00] \n[01:26.74] たまにね なくなっちゃう\n[01:30.50] 身体のバッテリー\n[01:34.40] あなたの笑顔で\n[01:37.78] いつも充電満タン パワー爆発しちゃえ\n[01:41.72] お願い お願い\n[01:45.87] まずはお友達から\n[01:49.07] 笑って 見つめて\n[01:51.41] 楽しい毎日にしたい\n[01:56.58] ほら Catch You Catch You\n[01:58.49] Catch Me Catch Me ゼッタイ\n[02:01.00] 運命だって お似合いだって\n[02:04.42] そう Nice to Meet You Good to See You きっと\n[02:08.41] 誰にも負けない あなたに世界で\n[02:10.55] 一番一番一番一番\n[02:14.14] コ・イ・シ・テ・ル\n[02:16.63] \n[02:38.57] ほら Catch You Catch You\n[02:40.53] Catch Me Catch Me 待って\n[02:43.22] こっちをむいて スキだといって\n[02:46.58] そう Nice to Meet You Good to See You きっと\n[02:50.85] 私の想い あなたのハートに\n[02:52.73] 飛んで飛んで飛んでいけ\n[02:56.22] 迷・わ・な・い\n[03:02.27] 運命だって お似合いだって\n[03:05.42] そう Nice to Meet You Good to See You きっと\n[03:09.43] 誰にも負けない あなたに世界で\n[03:11.43] 一番一番一番一番\n[03:14.55] コ・イ・シ・テ・ル"
  },
  {
    "title": "For フルーツバスケット",
    "videoId": "QSXg8VQqvkg",
    "lyric": "[00:16.88] とてもうれしかったよ 君が笑いかけてた\n[00:23.94] すべてを溶かす微笑みで\n[00:31.03] 春はまだ遠くて つめたい土の中で\n[00:34.00] 芽吹く瞬間(とき)を待ってたんだ\n[00:43.46] たとえば苦しい今日だとしても\n[00:46.96] 昨日の傷を残していても\n[00:50.77] 信じたい 心ほどいてゆけると\n[00:57.57] 生まれ変わることはできないよ\n[01:00.89] だけど変わってはいけるから\n[01:05.32] Let's stay together いつも\n[01:10.96] \n[01:26.74] 僕だけに笑って その指で ねえ触って\n[01:33.43] 望みばかりが果てしなく\n[01:40.65] やさしくしたいよ もう悔やまぬように\n[01:47.51] 嘆きの海も越えていこう\n[01:52.95] たとえ苦しい今日だとしても\n[01:56.39] いつかあたたかな想い出になる\n[01:59.97] 心ごとすべてなげだせたなら\n[02:07.07] ここに生きてる意味がわかるよ\n[02:10.41] 生まれおちた歓びを知る\n[02:14.87] Let's stay together いつも\n[02:21.10] \n[02:59.34] いつかあたたかな想い出になる\n[03:02.66] 心ごとすべてなげだせたなら\n[03:09.71] ここに生きてる意味がわかるよ\n[03:13.24] 生まれおちた歓びを知る\n[03:17.77] Let's stay together いつも"
  },
  {
    "title": "猫飯店メニュー・ソング",
    "videoId": "GiflB-5W0V0",
    "lyric": "[00:10.51] 請来　請来　猫飯店\n[00:13.53] 好吃了　好吃了　猫飯店\n[00:16.52] 麺是好吃了　姑娘是漂亮\n[00:22.15] 請来　請来　猫飯店\n[00:25.45] 好吃了　好吃了　猫飯店\n[00:28.07] 麺是好吃了　姑娘是漂亮\n[00:36.74] 柳麺　湯麺　炒飯　叉焼麺\n[00:39.53] 雲呑　餃子　炒麺　雲呑麺\n[00:42.51] 雑麺　焼売　芙蓉蟹蛋　生碼麺\n[00:45.08] 什景雲呑　蝦仁炒飯　白飯　水餃子　冷麺\n[00:54.65] 請来　請来　猫飯店\n[00:57.49] 好吃了　好吃了　猫飯店\n[01:00.23] 麺是好吃了　姑娘是漂亮\n[01:05.82] 請来　請来　猫飯店\n[01:08.81] 好吃了　好吃了　猫飯店\n[01:11.85] 麺是好吃了　姑娘是漂亮\n[01:16.96] \n[01:29.03] 白菜湯　蛋花湯　什景湯麺\n[01:31.92] 糖醋丸子　天津麺　中華丼\n[01:34.89] 什景炒飯　蝦仁湯麺　天津丼\n[01:37.50] 炒鮮菜　麻婆豆腐　糖醋肉塊　韮肝炒　八宝菜\n[01:46.82] 請来　請来　猫飯店\n[01:49.76] 好吃了　好吃了　猫飯店\n[01:52.66] 麺是好吃了　姑娘是漂亮\n[01:58.03] 請来　請来　猫飯店\n[02:01.05] 好吃了　好吃了　猫飯店\n[02:04.09] 麺是好吃了　姑娘是漂亮\n[02:08.55] 猫飯店　猫飯店"
  },
  {
    "title": "Let it Snow",
    "videoId": "kB5XK0BbxYE",
    "lyric": `[00:07.74] Oh, the weather outside is frightful\n[00:10.97] But the fire is so delightful\n[00:14.11] And since we've no place to go\n[00:17.73] Let it snow, let it snow, let it snow\n[00:21.73] Oh, it doesn't show signs of stopping\n[00:24.96] And I've bought some corn for popping\n[00:28.30] The lights are turned way down low\n[00:31.71] Let it snow, let it snow, let it snow\n[00:34.99] When we finally kiss goodnight\n[00:38.33] How I'll hate going out in the storm\n[00:42.25] But if you'll really hold me tight\n[00:45.77] All the way home I'll be warm\n[00:49.49] Oh, the fire is slowly dying\n[00:52.81] And, my dear, we're still goodbye-ing\n[00:56.38] But as long as you love me so\n[00:59.94] Let it snow, let it snow, and snow\n[01:03.67] \n[01:17.61] When we finally kiss goodnight\n[01:20.49] How I'll hate going out in the storm\n[01:24.07] But if you'll really hold me tight\n[01:27.98] All the way home I'll be warm\n[01:31.50] The fire is slowly dying\n[01:34.79] And, my dear, we're still goodbye-ing\n[01:38.47] But as long as you love me so\n[01:41.93] Let it snow, Let it snow, and snow`
  },
  {
    "title": "桃花諾",
    "videoId": "1h0oYsSw8-E",
    "lyric": `[00:19.00] 初見若繾綣誓言風吹雲舒捲\n[00:26.08] 歲月間問今夕又何年\n[00:32.49] 心有犀但願執念輪迴過經年\n[00:40.26] 彈指間繁花開落多少遍\n[00:46.82] 這一世牽絆糾結觸動了心弦\n[00:53.93] 下一世不知可否再見\n[01:00.53] 留一片桃花紀念了卻浮生緣\n[01:07.76] 眉目間還有我的思念\n[01:14.35] 一寸土一年木 一花一樹一貪圖\n[01:20.98] 情是種愛偏開在迷途\n[01:28.16] 忘前路忘舊物 忘心忘你忘最初\n[01:34.69] 花斑斑留在愛你的路\n[01:43.98] \n[01:54.70] 這一世牽絆糾結觸動了心弦\n[02:02.01] 下一世不知可否再見\n[02:08.91] 留一片桃花紀念了卻浮生緣\n[02:16.03] 眉目間還有我的思念\n[02:22.70] 一寸土一年木 一花一樹一貪圖\n[02:29.69] 情是種愛偏開在迷途\n[02:36.52] 忘前路忘舊物 忘心忘你忘最初\n[02:43.53] 花斑斑留在愛你的路\n[02:50.14] 虔誠夙願來世路 一念桃花因果渡\n[02:57.21] 那一念幾闕時光在重複\n[03:03.80] 聽雨書望天湖 人間寥寥情難訴\n[03:10.54] 回憶斑斑留在愛你的路`
  },
  {
    "title": "左手指月",
    "videoId": "qDGI4_a6wi0",
    "lyric": `[00:24.28] 左手握大地右手握著天\n[00:31.08] 掌紋裂出了十方的閃電\n[00:37.46] 把時光匆匆兌換成了年\n[00:43.90] 三千世 如所不見\n[00:51.07] 左手拈著花右手舞著劍\n[00:57.73] 眉間落下了一萬年的雪\n[01:03.09] 一滴淚 啊啊啊\n[01:10.06] 那是我 啊啊啊\n[01:18.16] \n[01:43.07] 左手一彈指右手彈著弦\n[01:50.07] 舟楫擺渡在忘川的水間\n[01:56.21] 當煩惱能開出一朵紅蓮\n[02:02.02] 莫停歇 給我雜念\n[02:09.08] 左手指著月右手取紅線\n[02:16.29] 賜予你和我如願的情緣\n[02:22.03] 月光中 啊啊啊\n[02:29.10] 你和我 啊啊啊\n[02:37.33] \n[02:49.22] 左手化成羽右手成鱗片\n[02:55.50] 某世在雲上某世在林間\n[03:01.52] 願隨你用一粒微塵的模樣\n[03:08.02] 在所有 塵世浮現\n[03:15.08] 我左手拿起你右手放下你\n[03:22.15] 合掌時你全部被收回心間\n[03:28.00] 一炷香 啊啊啊\n[03:34.04] 你是我 無二無別`
  },
].map(x => ({
  ...x, lyric: x.lyric.trim().split("\n").map(l => l.slice(1).split("]")).map(l => {
    let n = l[0].split(":").map(Number)
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
