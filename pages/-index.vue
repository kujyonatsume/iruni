<script setup>

onMounted(init)

function init() {
  let script = document.createElement("script");
  script.src = "/js/player.js";
  document.getElementById("ytel").appendChild(script)
}

</script>

<template>
  <v-layout style="display: flex;justify-content: center;" id="ytel">
    <div id="ytplayer"></div>
  </v-layout>
</template>
