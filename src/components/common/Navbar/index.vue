<template>
  <div>
    <v-btn v-for="link in links" :key="link.name" :to="link.to" text>{{
      link.name
    }}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      links: [{ name: 'Графік цін', to: { name: 'chart' } }]
    }
  }
}
</script>
