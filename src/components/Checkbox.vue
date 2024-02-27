<template>
  <q-checkbox
    v-model="val"
    color="red"
    :label="label"
  />
</template>

<script setup>
import { ref } from 'vue'

const val = ref(false)
const { label } = defineProps({
  label: String
})
</script>