<template>

  <body>
    <h1>
      ✨ git aesthetics ✨
    </h1>

    <ModeToggle v-model="modeToggleValue" />

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
          :disable="transparentBg"
          label="background color"
          v-model="backgroundColor"
        />
      </div>

      <div class="wrapper">
        <TextInput
          label="username"
          v-model="username"
        />
        <TextInput
          :disable="repositoryDisabled"
          label="repository"
          v-model="repository"
        />
      </div>

      <div class="wrapper">
        <SelectLanguage v-model="selectLanguageValue" />
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
    </div>

    <div class="wrapper">
      <ButtonComponent
        label="preview"
        @click="preview"
      />
      <ButtonComponent
        :disable="!lastGeneratedUrl"
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
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'
import ColorPicker from './components/ColorPicker.vue'
import CheckBox from './components/Checkbox.vue'
import TextInput from './components/TextInput.vue'
import SelectLanguage from './components/SelectLanguage.vue'
import ModeToggle from './components/ModeToggle.vue'
import ButtonComponent from './components/ButtonComponent.vue'

const $q = useQuasar()

const titleColor = ref('')
const iconColor = ref('')
const textColor = ref('')
const backgroundColor = ref('')
const showIcons = ref(false)
const hideBorder = ref(false)
const hideBackground = ref(false)
const username = ref('')
const repository = ref('')
const selectLanguageValue = ref('')
const modeToggleValue = ref(false)
const lastGeneratedUrl = ref('')
const repositoryDisabled = ref(true)
const transparentBg = ref(false)

watch(modeToggleValue, (newValue) => {
  repositoryDisabled.value = !newValue
})

watch(hideBackground, (newValue) => {
  transparentBg.value = newValue
})

function validateFields() {
  const isRepoMode = modeToggleValue.value
  const isBgHidden = hideBackground.value
  const requiredFields = [selectLanguageValue, titleColor, iconColor, textColor, username]

  if (isRepoMode) requiredFields.push(repository)

  if (!isBgHidden) requiredFields.push(backgroundColor)

  return requiredFields.every(field => field.value)
}

function preview() {
  if (!validateFields()) {
    $q.notify({
      message: 'fill all required fields!',
      color: 'negative',
      position: 'center',
      timeout: 8000,
    })
    return
  }

  const isRepoMode = modeToggleValue.value
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

  lastGeneratedUrl.value = buildURL(data, isRepoMode)
}

function buildURL(data, isRepoMode) {
  const baseUrl = 'https://github-readme-stats.vercel.app/api'
  const path = isRepoMode ? '/pin' : ''
  const queryParams = new URLSearchParams(data).toString()
  return `${baseUrl}${path}?${queryParams}`
}

function copyUrl() {
  if (lastGeneratedUrl.value) {
    navigator.clipboard.writeText(lastGeneratedUrl.value)
    $q.notify({
      message: 'copied!',
      color: 'positive',
      position: 'center',
      timeout: 500,
    })
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
  width: 500px;
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
