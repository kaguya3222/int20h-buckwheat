<template>
  <span>Hello</span>
</template>

<script>
import { searchProducts } from '@/api/products'

export default {
  name: 'PageHome',
  data() {
    return { buckwheat: null }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const { data } = await searchProducts()
        return data.items
      } catch (e) {
        console.log('failed doing request', e)
      }
    }
  }
}
</script>
