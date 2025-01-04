tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
onYouTubeIframeAPIReady()
function onYouTubeIframeAPIReady() {
    new YT.Player("ytplayer", {
        videoId: "oNODJP2vQTU",
        events: {
            onReady(event) {
                event.target.playVideo();
            },
            //onStateChange(event) {
            //    if (event.data === YT.PlayerState.ENDED) {
            //        location.reload();
            //    }
            //}
        }
    });
}