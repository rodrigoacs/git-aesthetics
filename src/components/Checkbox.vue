<template>
  <q-checkbox
    class="q-checkbox__label"
    v-model="val"
    :label="label"
    color="white"
    unchecked-icon="close"
    checked-icon="done"
    dark
    dense
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const val = ref(false)
const model = defineModel()
const { label } = defineProps({
  label: String
})

watch(val, (value) => {
  model.value = value
})
</script>

<style scoped>
.q-checkbox__label {
  width: 100%;
}
</style>