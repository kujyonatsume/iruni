<script setup>
import twemoji from 'twemoji';
const progress = ref(0);
const playing = ref(false)
const emit = defineEmits(['play'])
const prop = defineProps({
  text: String,
})
defineExpose({ text:prop.text, progress, playing })
const store = useDark()
const btnClasses = computed(() => ({
  'vo-btn-bg-dark': store.dark,
  'vo-btn-bg-light text-white': !store.dark,
  playing: playing.value
}))

// Reactive state
const twePara = {
  base: 'https://cdn.jsdelivr.net/npm/twemoji@12.0.2/2',
  folder: '/svg',
  ext: '.svg',
};



const emojiUrl = computed(() => {
  let reg = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  let match = reg.exec(twemoji.parse('⚖️', twePara));
  return match ? match[1] : '';
});

</script>

<template>

    <v-btn class="ma-1 pa-2 vo-btn" :class="[btnClasses]" :elevation="hover ? 6 : 2" rounded height="max-content"
      min-height="36px" @click="() => emit('play')" :style="{
        '--hover-content': 'url(\'' + emojiUrl + '\')',
        '--progress': progress + '%',
        '--start-percent': progress - 5 + '%'
      }">
      <div style="z-index: 2;">
        <slot class="slot">{{ text }}</slot>
      </div>
    </v-btn>

</template>

<style lang="scss" scoped>
$nonlinear-transition: cubic-bezier(0.25, 0.8, 0.5, 1);

.vo-btn {
  display: inline-block;
  max-width: 100%;
  word-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;
  text-transform: none !important;
  font-weight: 400;
  text-align: center;
  z-index: 2;
}

.vo-btn-bg-light {
  background: linear-gradient(to right, #0288d1 var(--start-percent), #6bb8f6 var(--progress));
}

.vo-btn-bg-dark {
  background: linear-gradient(to right, #0288d1 var(--start-percent), #1362a1 var(--progress));
}

.vo-btn div {
  display: inline-block;
  transition: 0.5s $nonlinear-transition;
  text-align: center;
  padding-left: 12px;
  padding-right: 12px;
}

.vo-btn div:after {
  content: var(--hover-content);
  position: absolute;
  right: -20px;
  opacity: 0;
  transition: 0.5s $nonlinear-transition;
  width: 20px;
  height: 20px;
}

.vo-btn:hover div {
  padding-left: 0;
  padding-right: 24px;
}

.vo-btn:hover div:after {
  opacity: 1;
  right: 5px;
  text-align: center;
}

.btn-progress {
  position: absolute;
  top: -8px;
  left: -16px;
  width: 0px;
  border-radius: 28px;
  min-height: 36px;
  height: 100%;
  //background: blue;
  transition: height 0.3s linear;
}

.playing div {
  animation: shake 3s linear infinite;
}

@keyframes shake {
  0% {
    transform: translateY(0px);
  }

  20% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(-4px);
  }

  30% {
    transform: translateY(0px);
  }

  35% {
    transform: translateY(-4px);
  }

  40% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
