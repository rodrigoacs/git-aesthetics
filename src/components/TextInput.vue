<template>
  <q-input
    filled
    v-model="text"
    :label="label"
  />
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>