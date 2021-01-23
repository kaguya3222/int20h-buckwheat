<template>
  <div>
    <span class="text-h5 d-inline-block mb-2">Фільтри:</span>
    <div
      v-for="filter in filters"
      :key="filter.id"
      class="d-flex flex-wrap mb-2"
    >
      <span class="mr-2 mb-1">{{ filter.name }}:</span>
      <div class="d-flex flex-wrap mb-2">
        <v-checkbox
          v-for="filterOption in filter.options"
          :key="filterOption.id"
          v-model="optionIds"
          class="mr-2 mt-0 pt-0 mb-1"
          :label="filterOption.name"
          :value="filterOption.id"
          hide-details
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      optionIds: []
    }
  },
  methods: {
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

      this.$emit('filtersChanged', selectedOptions)
    }
  }
}
</script>
