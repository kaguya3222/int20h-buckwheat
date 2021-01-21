<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
