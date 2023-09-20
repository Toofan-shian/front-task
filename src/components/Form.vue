<template>
  <h3 style="width: 100%">Add Customer</h3>

  <div class="my-form">
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
          @click="phoneInputIsInteracted = true"
        />
        <small id="phoneNumberHint" :class="phoneInputHintColor">Example: +989901619642</small>
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
import { PhoneNumberUtil } from 'google-libphonenumber';

export default {
  data() {
    return {
      phoneNumberUtil: new PhoneNumberUtil(),
      phoneInputIsInteracted: false,
      formData: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        bankAccountNumber: '',
      },
    }
  },
  methods: {
    validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    validateBankAccount(accountNumber) {
      const bankAccountPattern = /^[0-9]{12}$/;
      return bankAccountPattern.test(accountNumber);
    },
    validatePhoneNumber(phoneNumber) {

      try {
        const parsedPhoneNumber = this.phoneNumberUtil.parse(phoneNumber, 'IR');
        return this.phoneNumberUtil.isValidNumber(parsedPhoneNumber);
      } catch (error) {
        console.log(error)
        return false;
      }
    },
    storeCustomerData() {
      // existing customers
      const existingData = JSON.parse(localStorage.getItem('customerData')) || [];

      // check for uniqueness
      const isDuplicate = existingData.some((customer) => {
        return (
          customer.firstName === this.formData.firstName &&
          customer.lastName === this.formData.lastName &&
          customer.dateOfBirth === this.formData.dateOfBirth
        );
      });

      if (isDuplicate) {
        return;
      }

      existingData.push(this.formData);
      localStorage.setItem('customerData', JSON.stringify(existingData));
    },
    submitForm() {
      if (this.validateFormData()) {
        this.storeCustomerData();
        this.clearForm()
      }
    },
    validateFormData() {
      if (
        this.validateEmail(this.formData.email) &&
        this.validateBankAccount(this.formData.bankAccountNumber) &&
        this.validatePhoneNumber(this.formData.phoneNumber)
      ) {
        return true;
      }
      return false
    },
    clearForm() {
      this.formData.firstName = '';
      this.formData.lastName = '';
      this.formData.dateOfBirth = '';
      this.formData.phoneNumber = '';
      this.formData.email = '';
      this.formData.bankAccountNumber = '';
    },
  },
  computed: {
    phoneInputHintColor() {
      if (!this.phoneInputIsInteracted) {
        return
      }
      return this.validatePhoneNumber(this.formData.phoneNumber) ? 'green-text' : 'red-text'
    }
  }
}
</script>






<style scoped>
.my-form {
  max-width: 440px;
  margin: 0 auto; 
  padding: 20px;
  background-color: #f9f9f9; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="tel"],
input[type="email"] {
  width: 90%;
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
}

small {
  color: #888; 
  display: block; 
}

.submit-button {
  background-color: #007bff;
  color: #fff; 
  padding: 10px 20px;
  border: none; 
  border-radius: 4px; 
  cursor: pointer; 
}

.submit-button:hover {
  background-color: #0056b3; 
}

.red-text {
  color: red;
}
.green-text {
  color: green;
}
</style>