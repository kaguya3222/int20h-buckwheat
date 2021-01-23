<template>
  <v-select
    v-model="sortDir"
    :items="items"
    item-text="name"
    item-value="value"
    label="Сортувати:"
    color="brown darken-2"
    hide-details
    dense
    solo
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'PriceSorter',
  data() {
    return {
      sortDir: '',
      items: [
        {
          name: 'Від дешевих до дорогих',
          value: 'asc'
        },
        {
          name: 'Від дорогих до дешевих',
          value: 'desc'
        }
      ]
    }
  },
  methods: {
    onChange(sortDir) {
      this.$emit('sortingChanged', { sortBy: 'price', sortDir })
    }
  }
}
</script>
