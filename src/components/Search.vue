<template>
  <div>
    <h3>Search Customers</h3>
    <!-- Search input field -->
    <input
      id="search-field"
      v-model="searchQuery"
      placeholder="Search by name"
      type="text"
      class="search-input"
    />

    <!-- search results here -->
    <ul class="search-results">
      <li v-for="customer in searchResults" :key="customer.id" class="search-item">
        {{ customer.firstName }} {{ customer.lastName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {


  },
};
</script>

<style scoped>

</style>