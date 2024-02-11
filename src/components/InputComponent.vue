<template>
  <input
    class="input"
    type="text"
    v-model="inputValue"
    @input="handleInput"
    placeholder="user/project"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

let inputValue = ref('')

const emit = defineEmits(['update'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('update', inputValue.value)
}
</script>

<style scoped>
.input {
  max-width: 233px;
  width: 100%;
  display: block;
  padding: 8px 13px;
  font-size: 14px;
  border-radius: 14px;
  border: 1px solid gray;
}
</style>
