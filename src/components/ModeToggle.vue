<template>
  <div>
    <p>
      github stats
    </p>

    <q-toggle
      @update:model-value="value"
      v-model="value"
      color="white"
      keep-color
      dark
    />

    <p>
      repository info
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const value = ref(false)
const model = defineModel()

watch(value, (value) => {
  model.value = value
})

defineProps({
  value: Boolean,
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
}

p {
  margin: 0 10px;
}
</style>
