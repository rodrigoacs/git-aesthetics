<template>
  <q-select
    filled
    v-model="model"
    :options="options"
    label="locale"
  />
</template>

<script setup>
import { ref } from 'vue'

const model = ref('')

const options = ref([
  { label: 'English', value: 'en' },
  { label: 'Portuguese (Brazil)', value: 'pt-br' },
  { label: 'Spanish', value: 'es' },
  { label: 'Arabic', value: 'ar' },
  { label: 'German', value: 'de' },
  { label: 'Bengali', value: 'bn' },
  { label: 'Czech', value: 'cs' },
  { label: 'Greek', value: 'el' },
  { label: 'French', value: 'fr' },
  { label: 'Hungarian', value: 'hu' },
  { label: 'Indonesian', value: 'id' },
  { label: 'Italian', value: 'it' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'kr' },
  { label: 'Malayalam', value: 'ml' },
  { label: 'Burmese', value: 'my' },
  { label: 'Dutch', value: 'nl' },
  { label: 'Nepali', value: 'np' },
  { label: 'Polish', value: 'pl' },
  { label: 'Portuguese (Portugal)', value: 'pt-pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Swedish', value: 'se' },
  { label: 'Slovak', value: 'sk' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Ukrainian', value: 'uk-ua' },
  { label: 'Uzbek', value: 'uz' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Chinese (Taiwan)', value: 'zh-tw' }
])
</script>
