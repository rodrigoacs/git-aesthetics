<template>
  <q-input
    filled
    v-model="text"
    :label="label"
    color="white"
    dark
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const text = ref('')
const model = defineModel()

watch(text, (value) => {
  model.value = value
})

</script>

<style scoped>
.q-input {
  width: 100%;
}
</style>