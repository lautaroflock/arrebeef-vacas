<template>
  <section>
    <h2 class="page-title">Basic Dashboard</h2>

    <div class="metrics-grid">
      <article class="metric-card">
        <h3>Total Cattle</h3>
        <p class="metric-value">{{ totals.totalCattle }}</p>
      </article>

      <article class="metric-card">
        <h3>Cattle Today</h3>
        <p class="metric-value">{{ todayTotal }}</p>
      </article>

      <article class="metric-card">
        <h3>Cattle This Month</h3>
        <p class="metric-value">{{ monthTotal }}</p>
      </article>
    </div>

    <div class="panel">
      <h3>All Tropas</h3>
      <table class="tropa-table">
        <thead>
          <tr>
            <th>Tropa</th>
            <th>Cattle</th>
            <th>Plate</th>
            <th>Brand</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.tropas" :key="item.id">
            <td>{{ item.tropa }}</td>
            <td>{{ item.cattleCount }}</td>
            <td>{{ item.plate }}</td>
            <td>{{ item.brand }}</td>
            <td>{{ item.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="charts-grid">
      <article class="panel">
        <h3>Cows by Day</h3>
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
        <h3>Cows by Month</h3>
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
    return [{ label: 'No data', value: 0, width: 0 }]
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
