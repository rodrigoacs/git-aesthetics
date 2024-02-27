<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-input
        filled
        v-model="color"
        :label="label"
        dense="dense"
        label-color="#1976D2"
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const color = ref('#1976D2')

const { label } = defineProps({
  label: String
})

</script>
