<template>
  <v-app-bar app color="brown darken-2" dark>
    <router-link
      :to="{ name: 'products', params: { page: 1 } }"
      class="text-decoration-none"
    >
      <v-app-bar-title class="white--text">
        int20h buckwheat
      </v-app-bar-title>
    </router-link>
    <Navbar class="ml-4" />
  </v-app-bar>
</template>

<script>
import Navbar from '@/components/common/Navbar'

export default {
  name: 'Header',
  components: {
    Navbar
  }
}
</script>
