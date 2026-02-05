import { reactive, computed } from 'vue'

const today = new Date().toISOString().slice(0, 10)

const state = reactive({
  tropas: [
    {
      id: 1,
      tropa: 'TR-1001',
      cattleCount: 124,
      brand: 'Blue Ranch',
      plate: 'AB-1234',
      createdAt: today,
    },
    {
      id: 2,
      tropa: 'TR-1002',
      cattleCount: 88,
      brand: 'North Provider',
      plate: 'CD-5678',
      createdAt: today,
    },
    {
      id: 3,
      tropa: 'TR-1003',
      cattleCount: 93,
      brand: 'Iron Fields',
      plate: 'EF-9012',
      createdAt: today,
    },
  ],
})

const nextId = () => {
  const ids = state.tropas.map((item) => item.id)
  return ids.length ? Math.max(...ids) + 1 : 1
}

const addTropa = ({ tropa, brand, plate, cattleCount }) => {
  state.tropas.unshift({
    id: nextId(),
    tropa,
    brand,
    plate,
    cattleCount,
    createdAt: new Date().toISOString().slice(0, 10),
  })
}

const totals = computed(() => {
  const totalCattle = state.tropas.reduce((sum, item) => sum + Number(item.cattleCount || 0), 0)

  const byDay = {}
  const byMonth = {}

  state.tropas.forEach((item) => {
    byDay[item.createdAt] = (byDay[item.createdAt] || 0) + Number(item.cattleCount || 0)

    const monthKey = item.createdAt.slice(0, 7)
    byMonth[monthKey] = (byMonth[monthKey] || 0) + Number(item.cattleCount || 0)
  })

  return {
    totalCattle,
    byDay,
    byMonth,
  }
})

export const useTropasStore = () => ({
  state,
  addTropa,
  totals,
})
