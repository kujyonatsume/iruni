export default defineEventHandler(async (event) => {
    const url = `https://www.twitch.tv/iruni_ianvs`;
    if (/"isLiveBroadcast":true/.test(await (await fetch(url)).text()))
        return { id: "iruni_ianvs", api: "https://player.twitch.tv/js/embed/v1.js" }

    const yturl = "https://www.youtube.com/@IruniIanvs"
    var html = await (await fetch(`${yturl}/live`)).text()
    var stream = html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1]
    if (!stream) {
        html = await (await fetch(`${yturl}/streams`)).text()
        const data = [...html.matchAll(/"watchEndpoint":{"videoId":"(.*?)",(?:.*?)"upcomingEventData":{"startTime":"(\d+)",/g)].map(x => [x[1], x[2]])
        var time = Math.min(...data.map(x => Number(x[1])))
        const res = data.find(x => x[1] == `${time}`)!
        return { id: res[0], upcoming: res[1], api: "https://www.youtube.com/iframe_api" }
    }
    return { id: html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1], api: "https://www.youtube.com/iframe_api" }
})