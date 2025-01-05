<script setup>
const title = useTitle()
title.set("首頁")

onMounted(async () => {


  var { channel, id, upcoming } = (await $fetch("/api/stream"))
  console.log(channel, id, upcoming);
  
  var apiPlayer = document.getElementById('api-player')
  apiPlayer.innerText = ""
  if (channel) {
    apiPlayer.innerHTML = `<iframe src="https://player.twitch.tv/?channel=${channel}&parent=${location.host}&muted=false" allowfullscreen></iframe>`
  } else {
    apiPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&origin=${location.origin}" frameborder="0"></iframe>`
  }

})

</script>

<template>
  <v-layout id="videobox">
    <div id="api-player">魯尼沒有直播也沒有開待機台</div>
  </v-layout>
</template>

<style>
#api-player > iframe {
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