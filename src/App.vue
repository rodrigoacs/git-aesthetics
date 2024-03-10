<template>

  <body>
    <q-dialog
      v-model="previewDialog"
      dark
    >
      <q-card dark>
        <q-card-section class="row items-center q-pb-none">
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            dark
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Please fill all the fields.</div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="copyDialog"
      dark
    >
      <q-card dark>
        <q-card-section class="row items-center q-pb-none">
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            dark
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">copied!</div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <h1>
      ✨ git aesthetics ✨
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
      <img
        :src="lastGeneratedUrl"
        :alt="lastGeneratedUrl"
        style="width: 100%"
      />
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

const titleColor = ref('')
const iconColor = ref('')
const textColor = ref('')
const backgroundColor = ref('')
const showIcons = ref('')
const hideBorder = ref('')
const hideBackground = ref('')
const username = ref('')
const repository = ref('')
const selectLanguageValue = ref('')
const modeToggleValue = ref('')
const previewDialog = ref(false)
const copyDialog = ref(false)

const lastGeneratedUrl = ref('https://github-readme-stats.vercel.app/api/pin?title_color=ffffff&icon_color=79ff97&text_color=d4d4d4&bg_color=212121&show_icons=true&hide_border=false&hide_bg=false&username=rodrigoacs&repo=git-aesthetics&locale=en') // Store the last generated URL

function validateFields() {
  if (
    !titleColor.value ||
    !iconColor.value ||
    !textColor.value ||
    !backgroundColor.value ||
    !username.value ||
    !repository.value) {
    return false
  }
  return true
}

function generate() {
  if (!validateFields()) {
    console.error('Please fill all the fields.')
    previewDialog.value = true
    return
  }

  const data = {
    title_color: titleColor.value,
    icon_color: iconColor.value,
    text_color: textColor.value,
    bg_color: hideBackground.value ? '00000000' : backgroundColor.value,
    show_icons: showIcons.value,
    hide_border: hideBorder.value,
    username: username.value,
    repo: repository.value,
    locale: selectLanguageValue.value.value || 'en',
  }

  const isRepoMode = modeToggleValue.value

  lastGeneratedUrl.value = buildURL(data, isRepoMode)
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
      copyDialog.value = true
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  } else {
    console.log('No URL generated to copy.')
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var(--light);
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
  background-color: var(--primary);
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

.q-card {
  width: 300px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .wrapper {
    gap: 0.5rem;
  }

  .inputs-wrapper {
    width: 100%;
  }

  body {
    padding: 0px 16px;
  }
}
</style>
