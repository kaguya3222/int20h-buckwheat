<template>
  <div>
    <span class="text-h5 d-inline-block mb-2">Фільтри</span>
    <div v-for="filter in filters" :key="filter.id" class="mb-4">
      <span>{{ filter.name }}:</span>
      <v-select
        v-model="optionIds"
        :items="filter.options"
        item-text="name"
        item-value="id"
        label="Вибрати"
        color="brown darken-2"
        hide-details
        multiple
        chips
        dense
        solo
        @change="onChange"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Filters',
  data() {
    return {
      optionIds: []
    }
  },
  computed: {
    ...mapState('search/filters', {
      filters: 'filters'
    })
  },
  methods: {
    ...mapActions('search/filters', {
      updateSelectedFilters: 'updateSelectedFilters'
    }),
    onChange(optionIds) {
      const selectedOptions = optionIds.map(optionId => {
        const optionFilter = this.filters.find(filter =>
          filter.options.some(option => option.id === optionId)
        )

        return {
          filterOptionId: optionId,
          filterId: optionFilter.id
        }
      })

      this.updateSelectedFilters(selectedOptions)
    }
  }
}
</script>
