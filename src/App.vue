<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <PageError v-if="error" :error="error" />
        <router-view v-else />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { errorEvent } from '@/constants/customEvents'
import PageError from '@/pages/PageError'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default {
  name: 'App',
  components: {
    PageError,
    Header,
    Footer
  },
  data() {
    return {
      error: null
    }
  },
  watch: {
    $route() {
      this.error = null
    }
  },
  created() {
    this.$eventBus.$on(errorEvent, error => {
      this.error = error
    })
  }
}
</script>
