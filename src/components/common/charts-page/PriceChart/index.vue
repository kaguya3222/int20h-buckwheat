<template>
  <Chart :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import Chart from '@/components/common/Chart'

export default {
  name: 'PriceChart',
  components: { Chart },
  props: {
    raw: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const initialValue = { labels: [], datasets: [{ values: [] }] }

      return this.raw.reduce((acc, item) => {
        const accLabels = acc.labels
        const firstDatasetValues = acc.datasets[0].values

        return {
          labels: [...accLabels, item.date],
          datasets: [{ values: [...firstDatasetValues, item.pricePerKg] }]
        }
      }, initialValue)
    },
    chartOptions() {
      return {
        type: 'line',
        colors: ['#5D4037'],
        height: 300,
        tooltipOptions: {
          formatTooltipY: price => `${price.toFixed(2)}₴`
        }
      }
    }
  }
}
</script>
