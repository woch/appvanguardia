<template>
  <form @submit.prevent="crear" class="flex flex-col gap-2">
    <input v-model="nombre" placeholder="Nombre" class="p-2 border rounded" />
    <input v-model="edad" placeholder="Edad" class="p-2 border rounded" />
    <button class="bg-green-500 text-white p-2 rounded">Guardar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const edad = ref('')

const emit = defineEmits(['guardar'])

const crear = () => {
  if (!nombre.value || !edad.value) return alert('Campos requeridos')
  emit('guardar', { nombre: nombre.value, edad: edad.value })
  nombre.value = ''
  edad.value = ''
}
</script>
