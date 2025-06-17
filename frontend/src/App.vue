<template>
  <div class="app-container">
    <header class="header">CRUD de Personas</header>

    <div class="main-content">
      <aside class="sidebar">
        <button @click="mostrarFormulario = true">Crear Persona</button>
      </aside>

      <section class="content">
        <input type="text" v-model="busqueda" placeholder="Buscar..." />

        <ul class="persona-lista">
          <li v-for="persona in personasFiltradas" :key="persona._id">
            {{ persona.nombre }} ({{ persona.edad }})
            <button @click="eliminarPersona(persona._id)">Eliminar</button>
          </li>
        </ul>
      </section>
    </div>

    <!-- Modal -->
    <div v-if="mostrarFormulario" class="modal-overlay" @click.self="mostrarFormulario = false">
      <div class="modal">
        <h3>Nueva Persona</h3>
        <input v-model="nuevaPersona.nombre" placeholder="Nombre" />
        <input v-model="nuevaPersona.edad" placeholder="Edad" />
        <div class="modal-buttons">
          <button @click="crearPersona">Guardar</button>
          <button @click="mostrarFormulario = false">Cancelar</button>
        </div>
      </div>
    </div>

    <footer class="footer">© 2025 Tu Nombre</footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      personas: [],
      busqueda: "",
      nuevaPersona: { nombre: "", edad: "" },
      mostrarFormulario: false,
    };
  },
  computed: {
    personasFiltradas() {
      return this.personas.filter((p) =>
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
  },
  methods: {
    async obtenerPersonas() {
      const res = await axios.get("http://localhost:3000/api/personas");
      this.personas = res.data;
    },
    async crearPersona() {
      if (!this.nuevaPersona.nombre || !this.nuevaPersona.edad) return;
      await axios.post("http://localhost:3000/api/personas", this.nuevaPersona);
      this.nuevaPersona = { nombre: "", edad: "" };
      this.mostrarFormulario = false;
      this.obtenerPersonas();
    },
    async eliminarPersona(id) {
      await axios.delete(`http://localhost:3000/api/personas/${id}`);
      this.obtenerPersonas();
    },
  },
  mounted() {
    this.obtenerPersonas();
  },
};
</script>

<style>
/* Layout principal */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header,
.footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
.main-content {
  display: flex;
  flex: 1;
}
.sidebar {
  width: 200px;
  background: #f0f0f0;
  padding: 1rem;
}
.content {
  flex: 1;
  padding: 1rem;
}
.persona-lista {
  list-style: none;
  padding: 0;
}
.persona-lista li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.modal input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
}
.modal-buttons button {
  padding: 0.5rem 1rem;
}
</style>
