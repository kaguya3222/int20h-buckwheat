<template>
  <div>
    <h1 class="text-h4">
      Графік середніх цін на гречку за останні дні (за 1 кг)
    </h1>
    <PriceChart v-if="!isLoading" :raw="rawPriceChart" />
  </div>
</template>

<script>
import { getProductCharts } from '@/api/products'

import PriceChart from '@/components/common/charts-page/PriceChart'

export default {
  name: 'PageChart',
  components: { PriceChart },
  data() {
    return {
      isLoading: false,
      rawPriceChart: null
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.isLoading = true
        const { data } = await getProductCharts()
        this.rawPriceChart = data?.priceChart
      } catch (e) {
        console.log('failed doing request', e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
