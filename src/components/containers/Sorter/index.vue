<template>
  <div>
    <span>Сортувати:</span>
    <div class="d-flex">
      <v-select
        v-model="sortBy"
        :items="items"
        item-text="name"
        item-value="value"
        color="brown darken-2"
        hide-details
        dense
        solo
      />
      <v-btn-toggle v-model="sortDir" class="ml-1" dense>
        <v-btn value="asc" icon>
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn value="desc" icon>
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Sorter',
  data() {
    return {
      items: [
        {
          name: 'За ціною',
          value: 'price'
        },
        {
          name: 'За вагою',
          value: 'weight'
        }
      ]
    }
  },
  computed: {
    ...mapState('search/sorting', {
      selectedSorting: 'selectedSorting'
    }),
    sortBy: {
      get() {
        return this.selectedSorting.sortBy
      },
      set(sortBy) {
        this.updateSelectedSorting({
          sortBy,
          sortDir: this.sortDir
        })
      }
    },
    sortDir: {
      get() {
        return this.selectedSorting.sortDir
      },
      set(sortDir) {
        this.updateSelectedSorting({
          sortBy: this.sortBy,
          sortDir
        })
      }
    }
  },
  methods: {
    ...mapActions('search/sorting', {
      updateSelectedSorting: 'updateSelectedSorting'
    })
  }
}
</script>
