export default defineEventHandler(async (event) => {
    const url = `https://www.twitch.tv/iruni_ianvs`;
    if (/"isLiveBroadcast":true/.test(await (await fetch(url)).text()))
        return { channel: "iruni_ianvs" }

    const yturl = "https://www.youtube.com/@IruniIanvs"
    var html = await (await fetch(`${yturl}/live`)).text()
    var stream = html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1]
    if (!stream) {
        html = await (await fetch(`${yturl}/streams`)).text()
        const data = [...html.matchAll(/"watchEndpoint":{"videoId":"(.*?)",(?:.*?)"upcomingEventData":{"startTime":"(\d+)",/g)].map(x => [x[1], x[2]])
        const res = data.find(x => x[1] == `${Math.min(...data.map(x => Number(x[1])))}`)!
        return { id: res[0], upcoming: res[1] }
    }
    return { id: html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1] }
})