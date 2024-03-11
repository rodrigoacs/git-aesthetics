<template>
  <q-input
    v-model="color"
    :label="label"
    color="white"
    dark
  >
    <template #append>
      <div ref="colorInput">
        <q-icon
          name="colorize"
          class="cursor-pointer"
          id="color-picker"
        >
          <q-popup-proxy
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-color v-model="color" />
          </q-popup-proxy>
        </q-icon>
      </div>
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const color = ref('')

const colorInput = ref(null)

const model = defineModel()

const { label } = defineProps({
  label: String
})

watch(color, (value) => {
  model.value = value.split('#')[1]
  colorInput.value.style.color = value
})
</script>

<style scoped>
.q-input {
  width: 100%;
}
</style>
