<template>
  <div class="root-vuetify">
    <Form></Form>
    <Search></Search>
  </div>
</template>

<script>
import Form from './components/Form.vue';
import Search from './components/Search.vue'

export default {
  name: 'App',
  components: {
    Form,
    Search
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
