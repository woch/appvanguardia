<template>
  <div class="flex flex-col gap-4 w-full">
    <input
      v-model="busqueda"
      placeholder="Buscar por nombre"
      class="p-2 border rounded"
    />

    <ul class="divide-y border rounded">
      <li
        v-for="persona in filtradas"
        :key="persona._id"
        class="flex justify-between items-center p-2"
      >
        <span>{{ persona.nombre }} - {{ persona.edad }} años</span>
        <button @click="$emit('eliminar', persona._id)" class="text-red-600">
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ personas: Array })
const busqueda = ref('')

const filtradas = computed(() =>
  props.personas.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)
</script>
