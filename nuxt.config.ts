import site from './assets/locales/default.json';
import colors from 'vuetify/lib/util/colors.mjs'
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    devServer: {
        host: "localhost",
        port: 3000
    },
    css: ['@/assets/style.scss'],
    modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxtjs/mdc', '@nuxt/content', '@nuxtjs/sitemap'],
    app: {
        head: {
            title: site.title,
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'description',
                    name: 'description',
                    content: site.description
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: site.keywords
                },
                { hid: 'og:site_name', property: 'og:site_name', content: site.title },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:url', property: 'og:url', content: site.title },
                { hid: 'og:title', property: 'og:title', content: site.title },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: site.description
                },
                { hid: 'og:image', property: 'og:image', content: site.social_image },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:site', content: '@_natsume0304' },
                { name: "theme-color", content: site.color }
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: site.icon },
                { rel: 'shortcut icon', type: 'image/png', href: site.icon }
            ],
            script: [
                { src: "https://www.googletagmanager.com/gtag/js?id=G-GELZQM159V" },
                { src: "/js/analytics.js" }
            ]
        },
    },
    vuetify: {
        vuetifyOptions: {
            directives: true,
            theme: {
                defaultTheme: "light",
                themes: {
                    light: {
                        colors: {
                            primary: colors.blue.base,
                            secondary: colors.grey.darken4,
                            accent: colors.blue.lighten2,
                            error: colors.deepOrange.base,
                            warning: colors.orange.base,
                            info: colors.blueGrey.base,
                            success: colors.teal.base
                        }
                    },
                    dark: {
                        colors: {
                            primary: colors.blue.darken3,
                            secondary: colors.grey.darken4,
                            accent: colors.lightBlue.darken4,
                            error: colors.deepOrange.accent4,
                            warning: colors.amber.base,
                            info: colors.teal.lighten1,
                            success: colors.green.accent3
                        }
                    }
                }
            },
            icons: {
                defaultSet: "mdi-svg"
            },
        },
    },
    site: { url: 'iruni.natsumoe.com' },
    sitemap: {
        xsl: false,
    }
})