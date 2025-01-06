<script setup>
const title = useTitle()
title.set("首頁")

onMounted(showStream)

async function showStream() {
  var { channel, id, upcoming } = await (await fetch("https://api.natsumoe.com/iruni/stream")).json()
  console.log(channel, id, upcoming);

  var apiPlayer = document.getElementById('api-player')
  if (channel) {
    apiPlayer.innerHTML = `<iframe src="https://player.twitch.tv/?channel=${channel}&parent=${location.host}&muted=false" allowfullscreen></iframe>`
  } else if (id) {
    apiPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&origin=${location.origin}" frameborder="0"></iframe>`
  } else {
    setTimeout(showStream, 600000)
  }
}

</script>

<template>
  <v-layout id="videobox">
    <div id="api-player">魯尼沒有直播也沒有開待機台</div>
  </v-layout>
</template>

<style>
#api-player>iframe {
  height: min(calc(70vw / 16 * 9), 70vh);
  width: min(calc(70vh / 9 * 16), 70vw);
}

#videobox {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 50%;
}
</style>