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
  />
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PriceSorter',
  data() {
    return {
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
  computed: {
    ...mapState('search', {
      selectedSorting: 'selectedSorting'
    }),
    sortDir: {
      get() {
        return this.selectedSorting.sortDir
      },
      set(sortDir) {
        this.updateSelectedSorting({
          sortBy: 'price',
          sortDir
        })
      }
    }
  },
  methods: {
    ...mapActions({
      updateSelectedSorting: 'search/updateSelectedSorting'
    })
  }
}
</script>
