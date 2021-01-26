<template>
  <div class="d-flex flex-column align-start">
    <span class="text-h4">
      Whoops! Something went wrong 😢
      <template v-if="errorMessage">
        {{ errorMessage }}
      </template>
    </span>
    <v-btn class="mt-4" depressed color="primary" @click="reloadPage">
      Reload page
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'PageError',
  props: {
    error: {
      type: [Error, Object],
      default: () => ({})
    }
  },
  computed: {
    errorMessage() {
      return this.error.message
    }
  },
  methods: {
    reloadPage() {
      document.location.reload()
    }
  }
}
</script>
