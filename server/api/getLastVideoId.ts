export default defineEventHandler(async (event) => {
    const html = await (await fetch("https://www.youtube.com/@IruniIanvs/live")).text() as string;
    return { videoId: html.match(/<link rel="canonical" href="(?:.*?)v=(.*?)">/)?.[1] }
})
