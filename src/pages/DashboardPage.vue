<template>
  <section>
    <h2 class="page-title">Tablero basico</h2>

    <div class="metrics-grid">
      <article class="metric-card">
        <h3>Total de cabezas</h3>
        <p class="metric-value">{{ totals.totalCattle }}</p>
      </article>

      <article class="metric-card">
        <h3>Cabezas hoy</h3>
        <p class="metric-value">{{ todayTotal }}</p>
      </article>

      <article class="metric-card">
        <h3>Cabezas este mes</h3>
        <p class="metric-value">{{ monthTotal }}</p>
      </article>
    </div>
<br>
    <div class="panel">
      <h3>Todas las tropas</h3>
      <table class="tropa-table">
        <thead>
          <tr>
            <th>Tropa</th>
            <th>Cabezas</th>
            <th>Patente</th>
            <th>Marca</th>
            <th>Fecha</th>
            <th class="evidence-cell">Evidencia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.tropas" :key="item.id">
            <td>{{ item.tropa }}</td>
            <td>{{ item.cattleCount }}</td>
            <td>{{ item.plate }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.createdAt }}</td>
            <td class="evidence-cell">
              <a
                :href="`/mock/evidencias/${item.id}`"
                class="evidence-link"
                :aria-label="`Ver evidencia de ${item.tropa}`"
                title="Ver evidencia"
                @click.prevent
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9zm0 0v5h5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="m9 15 2-2 2 2 3-3"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
<br>
    <div class="charts-grid">
      <article class="panel">
        <h3>Cabezas por dia</h3>
        <div class="chart-list">
          <div v-for="bar in dayBars" :key="bar.label" class="chart-row">
            <span>{{ bar.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: bar.width + '%' }"></div>
            </div>
            <strong>{{ bar.value }}</strong>
          </div>
        </div>
      </article>

      <article class="panel">
        <h3>Cabezas por mes</h3>
        <div class="chart-list">
          <div v-for="bar in monthBars" :key="bar.label" class="chart-row">
            <span>{{ bar.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: bar.width + '%' }"></div>
            </div>
            <strong>{{ bar.value }}</strong>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useTropasStore } from '../data/tropasStore'

const { state, totals } = useTropasStore()

const today = new Date().toISOString().slice(0, 10)
const thisMonth = today.slice(0, 7)

const todayTotal = computed(() => totals.value.byDay[today] || 0)
const monthTotal = computed(() => totals.value.byMonth[thisMonth] || 0)

const toBars = (source) => {
  const entries = Object.entries(source)

  if (!entries.length) {
    return [{ label: 'Sin datos', value: 0, width: 0 }]
  }

  const max = Math.max(...entries.map(([, value]) => value), 1)

  return entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, value]) => ({
      label,
      value,
      width: Math.round((value / max) * 100),
    }))
}

const dayBars = computed(() => toBars(totals.value.byDay))
const monthBars = computed(() => toBars(totals.value.byMonth))
</script>
