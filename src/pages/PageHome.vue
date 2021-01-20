<template>
  <div>
    <span>Hello</span>
    <router-link :to="{ name: 'about' }">Click</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>
