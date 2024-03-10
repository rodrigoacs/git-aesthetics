<template>

  <body>
    <h1>
      ✨git aesthetics✨
    </h1>

    <ModeToggle v-model="modeToggleValue" />

    <SelectLanguage v-model="selectLanguageValue" />

    <div class="inputs-wrapper">
      <div class="wrapper">
        <ColorPicker
          label="title color"
          v-model="titleColor"
        />
        <ColorPicker
          label="icon color"
          v-model="iconColor"
        />
      </div>

      <div class="wrapper">
        <ColorPicker
          label="text color"
          v-model="textColor"
        />
        <ColorPicker
          label="background color"
          v-model="backgroundColor"
        />
      </div>

      <div class="wrapper">
        <CheckBox
          label="show icons"
          v-model="showIcons"
        />
        <CheckBox
          label="hide border"
          v-model="hideBorder"
        />
        <CheckBox
          label="hide background"
          v-model="hideBackground"
        />
      </div>

      <div class="wrapper">
        <TextInput
          label="username"
          v-model="username"
        />
        <TextInput
          label="repository"
          v-model="repository"
        />
      </div>
    </div>

    <div class="wrapper">
      <ButtonComponent
        label="preview"
        @click="generate"
      />
      <ButtonComponent
        label="copy url"
        @click="copyUrl"
      />
    </div>

    <div class="wrapper">
      <q-card
        class="q-ma-md"
        style="width: 100%"
      >
        <q-card-section>
          <q-img
            :src="lastGeneratedUrl"
            :alt="lastGeneratedUrl"
            style="width: 100%"
          />
        </q-card-section>
      </q-card>
    </div>
  </body>
</template>

<script setup>
import { reactive, watch, ref } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import CheckBox from './components/Checkbox.vue'
import TextInput from './components/TextInput.vue'
import SelectLanguage from './components/SelectLanguage.vue'
import ModeToggle from './components/ModeToggle.vue'
import ButtonComponent from './components/ButtonComponent.vue'

const titleColor = ref('ffffff')
const iconColor = ref('79ff97')
const textColor = ref('d4d4d4')
const backgroundColor = ref('212121')
const showIcons = ref(true)
const hideBorder = ref(false)
const hideBackground = ref(false)
const username = ref('rodrigoacs')
const repository = ref('git-aesthetics')
const selectLanguageValue = ref('')
const modeToggleValue = ref(false)

const lastGeneratedUrl = ref('https://github-readme-stats.vercel.app/api/pin?title_color=ffffff&icon_color=79ff97&text_color=d4d4d4&bg_color=212121&show_icons=true&hide_border=false&hide_bg=false&username=rodrigoacs&repo=git-aesthetics&locale=en') // Store the last generated URL

function generate() {
  const data = {
    title_color: titleColor.value,
    icon_color: iconColor.value,
    text_color: textColor.value,
    bg_color: backgroundColor.value,
    show_icons: showIcons.value,
    hide_border: hideBorder.value,
    hide_bg: hideBackground.value,
    username: username.value,
    repo: repository.value,
    locale: selectLanguageValue.value.value || 'en',
  }
  console.log(data)
  const isRepoMode = modeToggleValue.value
  lastGeneratedUrl.value = buildURL(data, isRepoMode) // Update the stored URL
  console.log(lastGeneratedUrl.value) // Log the URL for debugging
}

function buildURL(data, isRepoMode) {
  const baseUrl = 'https://github-readme-stats.vercel.app/api'
  const path = isRepoMode ? '/pin' : ''
  const queryParams = new URLSearchParams(data).toString()
  return `${baseUrl}${path}?${queryParams}`
}

async function copyUrl() {
  if (lastGeneratedUrl.value) {
    try {
      await navigator.clipboard.writeText(lastGeneratedUrl.value)
      console.log('URL copied to clipboard:', lastGeneratedUrl.value)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  } else {
    console.log('No URL generated to copy.')
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap);

* {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: white;
}

h1 {
  font-size: 2rem;
  margin: 0.5rem 0;
  text-align: center;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
}

.inputs-wrapper {
  max-width: 480px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  width: 100%;
  gap: 1rem;
}

@media (max-width: 600px) {
  .wrapper {
    flex-direction: column;
  }

  .inputs-wrapper {
    width: 100%;
  }

  body {
    padding: 10px;
  }
}
</style>