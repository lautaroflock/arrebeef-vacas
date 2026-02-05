<template>
  <section class="mobile-page">
    <h2 class="page-title">Mobile Troops App</h2>

    <div class="mobile-layout">
      <div class="panel">
        <h3>Tropas List</h3>
        <ul class="clean-list">
          <li
            v-for="item in state.tropas"
            :key="item.id"
            :class="['list-item', { active: selected?.id === item.id }]"
            @click="selectItem(item)"
          >
            <strong>{{ item.tropa }}</strong>
            <span>{{ item.cattleCount }} cattle</span>
          </li>
        </ul>
      </div>

      <div class="panel">
        <h3>Selected Tropa Detail</h3>
        <div v-if="selected" class="detail-grid">
          <p><strong>Number:</strong> {{ selected.tropa }}</p>
          <p><strong>Quantity of cattle:</strong> {{ selected.cattleCount }}</p>
          <p><strong>Brand provider:</strong> {{ selected.brand }}</p>
          <p><strong>Plate:</strong> {{ selected.plate }}</p>
        </div>
        <p v-else>Select one tropa from the list.</p>
      </div>
    </div>

    <div class="panel add-panel">
      <h3>Add Tropa</h3>
      <form @submit.prevent="saveTropa" class="form-grid">
        <label>
          Tropa
          <input v-model.trim="form.tropa" required placeholder="TR-2001" />
        </label>

        <label>
          Brand provider
          <input v-model.trim="form.brand" required placeholder="Provider name" />
        </label>

        <label>
          Plate
          <input v-model.trim="form.plate" required placeholder="AA-0000" />
        </label>

        <div class="camera-box">
          <p><strong>Camera count:</strong> {{ form.cattleCount ?? 'Not counted yet' }}</p>
          <button type="button" class="btn-secondary" @click="simulateCameraCount">
            Call Camera to Count
          </button>
        </div>

        <button type="submit" class="btn-main">Add New Tropa</button>
      </form>
    </div>

    <div v-if="bigScreenValue !== null" class="big-screen">
      <h3>Count Result</h3>
      <p class="big-number">{{ bigScreenValue }}</p>
      <span>CATTLE</span>
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
