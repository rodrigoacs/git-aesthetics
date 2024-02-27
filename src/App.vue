<template>
  <ColorPicker label="title color" />
  <ColorPicker label="icon color" />
  <ColorPicker label="text color" />
  <ColorPicker label="background color" />
  <CheckBox label="show icons" />
  <CheckBox label="hide border" />
  <CheckBox label="transparent background" />
  <TextInput label="username" />
  <TextInput label="repository" />
  <SelectLanguage />
</template>

<script setup>
import ColorPicker from './components/ColorPicker.vue'
import CheckBox from './components/Checkbox.vue'
import TextInput from './components/TextInput.vue'
import SelectLanguage from './components/SelectLanguage.vue'
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #333;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>