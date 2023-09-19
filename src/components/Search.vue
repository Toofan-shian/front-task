<template>
  <div>
    <h3>Search Customers</h3>
    <!-- Search input field -->
    <input
      id="search-field"
      v-model="searchQuery"
      placeholder="Search by name"
      type="text"
      @input="searchCustomers"
      class="search-input"
    />

    <!-- search results here -->
    <ul class="search-results" v-if="searchQuery.trim() != ''">
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
    searchCustomers() {

      const customerData = JSON.parse(localStorage.getItem('customerData')) || [];


      // Filter customers based on the search query (case-insensitive)
      this.searchResults = customerData.filter((customer) => {

        const fullName = `${customer.firstName} ${customer.lastName}`;
        return fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

    },
  },
};
</script>

<style scoped>

</style>