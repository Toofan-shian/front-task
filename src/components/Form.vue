<template>
  <h3>Add Customer</h3>

  <div>
    <form @submit.prevent="submitForm" id="form">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          v-model="formData.firstName"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          v-model="formData.lastName"
          required
        />
      </div>

      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          v-model="formData.dateOfBirth"
          required
        />
      </div>

      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="formData.phoneNumber"
          required
        />
        <small>Example: +989901619642</small>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
        />
      </div>

      <div class="form-group">
        <label for="bankAccount">Bank Account Number:</label>
        <input
          type="text"
          id="bankAccount"
          v-model="formData.bankAccountNumber"
          required
          pattern="[0-9]{12}"
        />
        <small>Format: 12 digits (e.g., 123456789012)</small>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script >
export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        bankAccountNumber: '',
      },
    }
  }
}
</script>

<style scoped>

</style>