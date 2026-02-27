<template>
  <section class="mobile-page">
    <h2 class="page-title">Aplicacion movil de tropas</h2>

    <div class="mobile-layout">
      <div class="panel">
        <h3>Lista de Tropas</h3>
        <ul class="clean-list">
          <li
            v-for="item in state.tropas"
            :key="item.id"
            :class="['list-item', { active: selected?.id === item.id }]"
            @click="selectItem(item)"
          >
            <strong>{{ item.tropa }}</strong>
            <span>{{ item.cattleCount }} cabezas</span>
          </li>
        </ul>
      </div>

      <div class="panel">
        <h3>Detalle de Tropa Seleccionada</h3>
        <div v-if="selected" class="detail-grid">
          <p><strong>Numero:</strong> {{ selected.tropa }}</p>
          <p><strong>Cantidad de cabezas:</strong> {{ selected.cattleCount }}</p>
          <p><strong>Proveedor de marca:</strong> {{ selected.brand }}</p>
          <p><strong>Patente:</strong> {{ selected.plate }}</p>
        </div>
        <p v-else>Selecciona una tropa de la lista.</p>
      </div>
    </div>

    <div class="panel add-panel">
      <h3>Agregar Tropa</h3>
      <form @submit.prevent="saveTropa" class="form-grid">
        <label>
          Tropa
          <input v-model.trim="form.tropa" required placeholder="TR-2001" />
        </label>

        <label>
          Proveedor de marca
          <input v-model.trim="form.brand" required placeholder="Nombre del proveedor" />
        </label>

        <label>
          Patente
          <input v-model.trim="form.plate" required placeholder="AA-0000" />
        </label>

        <div class="camera-box">
          <p><strong>Conteo de camara:</strong> {{ form.cattleCount ?? 'Aun sin conteo' }}</p>
          <button type="button" class="btn-secondary" @click="simulateCameraCount">
            Usar camara para contar
          </button>
        </div>

        <button type="submit" class="btn-main">Agregar nueva tropa</button>
      </form>
    </div>

    <div v-if="bigScreenValue !== null" class="big-screen">
      <h3>Resultado del conteo</h3>
      <p class="big-number">{{ bigScreenValue }}</p>
      <span>CABEZAS</span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useTropasStore } from '../data/tropasStore'

const { state, addTropa } = useTropasStore()

const selected = ref(state.tropas[0] || null)
const bigScreenValue = ref(null)

const form = reactive({
  tropa: '',
  brand: '',
  plate: '',
  cattleCount: null,
})

const selectItem = (item) => {
  selected.value = item
}

const simulateCameraCount = () => {
  const simulated = Math.floor(Math.random() * 200) + 20
  form.cattleCount = simulated
  bigScreenValue.value = simulated
}

const saveTropa = () => {
  if (!form.cattleCount) {
    simulateCameraCount()
  }

  addTropa({
    tropa: form.tropa,
    brand: form.brand,
    plate: form.plate,
    cattleCount: form.cattleCount,
  })

  selected.value = state.tropas[0]

  form.tropa = ''
  form.brand = ''
  form.plate = ''
  form.cattleCount = null
}
</script>
