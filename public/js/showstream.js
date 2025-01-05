let player
showstream()
function onYouTubeIframeAPIReady(id) {
    player = new YT.Player("api-player", {
        videoId: id,
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
                    if (player) player.destroy();
                }
            }
        }
    });
}

function onTwitchIframeAPIReady(id) {
    player = new Twitch.Player("api-player", {
        channel: id,
        parent: [location.origin.replace(/https?:\/\//, "")]
    });
}

async function showstream() {
    var { api, id } = await (await fetch("/api/stream")).json()
    if (!id) return
    let tag = document.createElement("script");
    tag.src = api;
    let firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if (window.Twitch) {
        onTwitchIframeAPIReady(id)
    }
    else {
        onYouTubeIframeAPIReady(id);
    }


}