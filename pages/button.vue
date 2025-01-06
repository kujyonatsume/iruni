<script setup>
import voiceLists from '~/assets/voices.json';
import {
  mdiClockOutline,
  mdiClose,
  mdiPlay,
  mdiRepeat,
  mdiSelectionEllipseArrowInside,
  mdiShuffle,
  mdiStop,
  mdiViewParallel,
} from '@mdi/js';

const icons = {
  close: mdiClose,
  play: mdiPlay,
  stop: mdiStop,
  selectionEllipseArrowInside: mdiSelectionEllipseArrowInside,
  viewParallel: mdiViewParallel,
  repeat: mdiRepeat,
  shuffle: mdiShuffle,
  clockOutline: mdiClockOutline,
};

const fab = ref(false);

const control = {
  self: "播放控制",
  pick_one: "幫我選一個",
  stop: "停止",
  enabled: "開啟",
  disabled: "關閉",
  overlap: "重疊播放",
  random: "隨機播放",
  repeat: "洗腦循環",
  full_name: "魯尼",
  overlap_title: "魯尼"
}
const title = useTitle()
title.set("音效按鈕")

const dark = useDark()
const childRef = ref([]);
const nowPlaying = reactive(new Set())
const overlap = ref(false);
const random = ref(false);
const repeat = ref(false);

const fabIcon = computed(() => [dark.data ? 'text-white-darken-1' : 'text-blue']);
const fabColor = computed(() => [dark.data ? 'bg-indigo-darken-1' : 'bg-white-lighten-2'])
const speedDial = computed(() => [dark.data ? 'bg-cyan-darken-1' : 'bg-cyan-lighten-2'])
const overlapText = computed(() => `${control.overlap} ${overlap.value ? control.enabled : control.disabled}`);
const randomText = computed(() => `${control.random} ${random.value ? control.enabled : control.disabled}`);
const repeatText = computed(() => `${control.repeat} ${repeat.value ? control.enabled : control.disabled}`);

const groups = ref(voiceLists.groups);

function playRandomVoice() {
  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const randomGroup = groups.value[getRandomInt(groups.value.length)];
  const randomVoice = randomGroup.voices[getRandomInt(randomGroup.voices.length)];
  play(randomVoice);
};

function play(item) {
  let timer = null;
  const child = childRef.value.find(x => x.text == item.description)
  console.log(child.text);

  const audio = new Audio(item.path);
  let setup_timer = () => {
    if (timer !== null) clear_timer();
    timer = setInterval(() => {
      let prog = Number(((audio.currentTime / audio.duration) * 100).toFixed(2));
      if (prog !== Infinity && !isNaN(prog)) {
        child.progress = prog;
      } else {
        child.progress = 0;
      }
    }, 50);
  };
  let smooth_end = () => {
    let play_end_timer = setInterval(() => {
      child.progress -= 5;
      if (child.progress <= 0) {
        clearInterval(play_end_timer);
        play_end_timer = null;
      }
    }, 50);
    child.playing = false;
  };
  let clear_timer = () => {
    clearInterval(timer);
    timer = null;
  };
  audio.addEventListener('canplay', () => {
    if (!overlap.value) {
      stopAll();
    }
    nowPlaying.add(audio);
    child.playing = true;
    setup_timer()
    audio.play()
  });

  audio.addEventListener('pause', () => {
    smooth_end();
    clear_timer();
    nowPlaying.delete(audio);
  });

  audio.addEventListener('ended', () => {
    nowPlaying.delete(audio);
    if (repeat.value) {
      setup_timer()
      child.playing = true
      play(item);
    } else if (random.value) {
      playRandomVoice();
    } else {
      smooth_end();
      clear_timer();
      nowPlaying.delete(audio);
    }
  });

  audio.load()
};

function stopAll() {
  nowPlaying.forEach((audio) => {
    audio.pause();
    nowPlaying.delete(audio);
  });
};

</script>
<template>
  <v-layout>
    <v-speed-dial style="position:fixed" :closeOnContentClick="false">
      <template v-slot:activator="{ props }">
        <v-btn class="float-tool text-white" v-bind="props" :class="speedDial">
          <v-icon :size="24">
            {{ fab ? icons.close : icons.play }}
          </v-icon>
        </v-btn>
      </template>
      <div></div>
      <v-btn class="btn-fab" :class="fabColor" @click="stopAll">
        <span class="fab-tip">{{ control.stop }}</span>
        <v-icon :class="fabIcon">
          {{ icons.stop }}
        </v-icon>
      </v-btn>
      <v-btn class="btn-fab" :class="fabColor" @click="playRandomVoice">
        <span class="fab-tip">{{ control.pick_one }}</span>
        <v-icon :class="fabIcon">
          {{ icons.selectionEllipseArrowInside }}
        </v-icon>
      </v-btn>
      <v-btn class="btn-fab" :class="fabColor" :disabled="random" @click="() => overlap = !overlap">
        <span class="fab-tip">
          {{ overlapText }}
        </span>
        <v-icon :class="fabIcon">
          {{ icons.viewParallel }}
        </v-icon>
      </v-btn>
      <v-btn class="btn-fab" :class="fabColor" :disabled="random" @click="() => repeat = !repeat">
        <span class="fab-tip">
          {{ repeatText }}
        </span>
        <v-icon :class="fabIcon">
          {{ icons.repeat }}
        </v-icon>
      </v-btn>
      <v-btn class="btn-fab" v-model="fab" :class="fabColor" :disabled="overlap || repeat"
        @click="() => random = !random">
        <span class="fab-tip">
          {{ randomText }}
        </span>
        <v-icon :class="fabIcon">
          {{ icons.shuffle }}
        </v-icon>
      </v-btn>
    </v-speed-dial>
    <v-flex style="min-width: 85%;">
      <v-card v-for="group in groups" :key="group.name">
        <v-card-title class="headline text-grey-lighten">
          {{ group.description }}
        </v-card-title>
        <v-card-text>
          <voice-btn v-for="voice in group.voices" :text="voice.description" :key="voice.name"
            :ref="el => childRef.push(el)" @play="() => play(voice)" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style lang="scss" scoped>
$nonlinear-transition: cubic-bezier(0.25, 0.8, 0.5, 1);

.v-card {
  margin: 8px auto;
}

.fab-tip {
  position: absolute;
  right: 60px;
  padding: 5px 16px;
  background: rgba(97, 97, 97, 0.9);
  border-radius: 4px;
  color: #fff;
  width: auto;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  opacity: 0.9;
  text-transform: none;
  letter-spacing: normal;
}

.notification-board {
  white-space: pre-line;
  height: auto;
  display: flex;
}

.notification-board ::v-deep p {
  margin-bottom: 0;
}

.float-tool {
  position: fixed;
  border-radius: 28px;
  min-width: 56px;
  height: 56px !important;
  z-index: 100;
  top: calc(100% - 100px);
  left: calc(100% - 100px);
}

.btn-fab {
  border-radius: 20px;
  min-width: 40px !important;
  width: 40px;
  height: 40px;
}
</style>
