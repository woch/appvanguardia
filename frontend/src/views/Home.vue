<template>
  <div class="flex h-screen">
    <Sidebar @crear="mostrarForm = true" />
    <main class="flex-1 p-6 space-y-6">
      <CrearPersona v-if="mostrarForm" @guardar="guardarPersona" />
      <PersonaList :personas="personas" @eliminar="eliminarPersona" />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import CrearPersona from '../components/CrearPersona.vue'
import PersonaList from '../components/PersonaList.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const personas = ref([])
const mostrarForm = ref(false)

const obtenerPersonas = async () => {
  const res = await axios.get('http://localhost:3000/api/personas')
  personas.value = res.data
}

const guardarPersona = async (persona) => {
  await axios.post('http://localhost:3000/api/personas', persona)
  mostrarForm.value = false
  obtenerPersonas()
}

const eliminarPersona = async (id) => {
  await axios.delete(`http://localhost:3000/api/personas/${id}`)
  obtenerPersonas()
}

onMounted(obtenerPersonas)
</script>
