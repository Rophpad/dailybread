// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt'
  ],
  googleFonts: {
    families: {
      Inter: [400, 700],
      Poppins: [400, 700],
      Pacifico: [400],
      Courgette: [400],
    },
    display: "swap",
  },
  
});