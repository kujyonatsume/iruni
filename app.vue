<script setup>
import site from '~/assets/locales/default.json';
import {
  mdiApps as apps,
  mdiPlayBoxMultipleOutline as playBox,
  mdiPlaylistMusicOutline as playlist,
  mdiCodeTags as codeTags,
  mdiBrightness2 as brightness,
  mdiGithub as github
} from '@mdi/js'

const dark = useDark()
const theme = useTheme();
const drawer = ref(false)

const changeMode = () => {
  dark.change()
  theme.global.name.value = dark.data ? 'dark' : 'light'
}
const title = useTitle()

const pages = [
  { icon: apps, title: "首頁", to: "/" },
  { icon: playlist, title: "歌曲清單", to: "/playlist" },
  { icon: playBox, title: "音效按鈕", to: "/button" },
]

const links = [
  { icon: "./img/twitch-fill.svg", title: "Twitch", to: "https://www.twitch.tv/iruni_ianvs" },
  { icon: "./img/youtube-fill.svg", title: "YouTube", to: "https://www.youtube.com/@IruniIanvs" },
  { icon: "./img/twitter-fill.svg", title: "Twitter", to: "https://x.com/iruni_ianvs" },
  { icon: "./img/facebook-fill.svg", title: "Facebook", to: "https://www.facebook.com/iruniianvs" },
  { icon: "./img/instagram-fill.svg", title: "Instagram", to: "https://www.instagram.com/iruni_ianvs" },
  { icon: "./img/threads-fill.svg", title: "Threads", to: "https://www.threads.net/@iruni_ianvs" }
]

</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="1024" class="elevation-3">
      <v-list style="padding-top: 0;">
        <v-list-item v-for="(item, i) in pages" :key="i" :href="item.to">
          <v-list-item-action> <v-icon>{{ item.icon }}</v-icon> </v-list-item-action>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(item, i) in links" :key="i + pages.length" :href="item.to" target="_blank"
          rel="noreferrer">
          <v-list-item-action> <v-img :src="item.icon" style="width: 24px;" /> </v-list-item-action>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item dense to="/about" :exact="true">
          <v-list-item-action> <v-icon>{{ codeTags }}</v-icon> </v-list-item-action>
          <v-list-item-title>關於</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="bg-primary text-white">
      <v-app-bar-nav-icon class="text-white" @click="drawer = !drawer" />
      <v-toolbar-title style="flex:none">{{ title.data }}</v-toolbar-title>
      <v-img :src="site.icon" style="max-width: 24px; margin-left: 6px;" />
      <v-spacer />
      <v-tooltip>
        <template v-slot:activator="{ on }">
          <v-btn icon class="text-white" @click="changeMode" v-on="on">
            <v-icon>{{ brightness }}</v-icon>
          </v-btn>
        </template>
        <span>{{ site.switch_dark_mode }}</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>

      <v-container class="page" style="display: block; max-width: 100%;">
        <NuxtPage />
      </v-container>

      <v-footer class="footer">
        <div>
          <div style="vertical-align: middle;">
            <p>&copy; {{ new Date().getFullYear() }} <a :href="site.footer.author_link" target="_blank"
                rel="noreferrer">
                {{ site.footer.author }}
              </a>
            </p>
            <v-btn v-if="site.footer.repo_link === 'no_display'" icon :href="site.footer.repo_link" target="_blank"
              style="vertical-align: middle;" rel="noreferrer">
              <v-icon>{{ github }}</v-icon>
            </v-btn>
          </div>
          <div>
            <p>{{ site.footer.content }}</p>
          </div>
        </div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style lang="scss">
$blur-function: blur(3px);

html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.v-toolbar__content {
  height: 48px !important;
}

.v-list-item-action {
  margin-right: 32px;
}

.v-list-item__content {
  display: flex;
  justify-content: left;
}

.nav-drawer-img {
  width: auto;
  height: 100%;

  -webkit-filter: $blur-function;
  -moz-filter: $blur-function;
  -ms-filter: $blur-function;
  filter: $blur-function;

}

.nav-darwer-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
}

.nav-darwer-overlay-light {
  background-color: rgba(255, 255, 255, 0.8);
}

.nav-darwer-overlay-dark {
  background-color: rgba(0, 0, 0, 0.8);
}

a {
  text-decoration: none;
}

.page {
  box-sizing: border-box;
  min-height: calc(100% - 64px);
}
</style>
