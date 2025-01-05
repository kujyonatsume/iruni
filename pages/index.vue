<script setup>
const title = useTitle()
title.set("首頁")

useHead({
  script: [{ src: "/js/showstream.js" }]
})

</script>

<template>
  <v-layout id="videobox">
    <div id="api-player">魯尼沒有直播也沒有開待機台</div>
  </v-layout>
</template>

<style>
#videobox {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 50%;
}
</style>