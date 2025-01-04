export default defineEventHandler(async (event) => {
    const html = await (await fetch("https://www.youtube.com/@IruniIanvs/live")).text()
    // const data = html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">|watch\?v=(.*?)"/)
    //  return { isLive: Boolean(data?.[1]), videoId: data?.[1] ?? data?.[2] }

    return { videoId: html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1] }
})
