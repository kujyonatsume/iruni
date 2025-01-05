<script setup>
const title = useTitle()
title.set("歌單播放器")
onMounted(init)

function init() {
  let script = document.createElement("script");
  script.src = "/js/player.js";
  document.getElementById("videobox").appendChild(script)
}

</script>

<template>
  <v-layout id="videobox">
    <div id="ytplayer"></div>
    <br>
    <div class="bg"></div>
  </v-layout>
</template>

<style>
.bg {
  width: 100%;
  height: 150px;
  margin: 15px auto;
  color: darkgrey;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.bg ul {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  list-style: none;
}

.bg ul li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.bg ul li.active {
  color: black;
  font-size: 15px;
}

#videobox {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 50%;
}
</style>