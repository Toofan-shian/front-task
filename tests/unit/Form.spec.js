import {mount} from '@vue/test-utils'
import Form from '@/components/Form'

describe("Form.vue", () => {


  it('renders the form', () => {
    let wrapper = mount(Form)
    expect(wrapper.find('#form').exists()).toBe(true)
  })



  it('renders all the form inputs', () => {
    const wrapper = mount(Form);
    expect(wrapper.find('#firstName').exists()).toBe(true);
    expect(wrapper.find('#lastName').exists()).toBe(true);
    expect(wrapper.find('#dob').exists()).toBe(true);
    expect(wrapper.find('#phoneNumber').exists()).toBe(true);
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#bankAccount').exists()).toBe(true);
  })



  it('validates email', async () => {
    const wrapper = mount(Form);
    const emailInput = wrapper.find('#email');
    
    await emailInput.setValue('wrong');
    expect(wrapper.vm.validateEmail('wrong')).toBe(false);
    
    await emailInput.setValue('correct@example.com');
    expect(wrapper.vm.validateEmail('correct@example.com')).toBe(true);
  })
 


  it('validates bank account number', async () => {
    const wrapper = mount(Form);
    const bankAccountInput = wrapper.find('#bankAccount');
    
    await bankAccountInput.setValue('wrong');
    expect(wrapper.vm.validateBankAccount('wrong')).toBe(false);
    
    await bankAccountInput.setValue('123456789999');
    expect(wrapper.vm.validateBankAccount('123456789999')).toBe(true);
  })



  it('validates phone number', async () => {
    const wrapper = mount(Form);
    const phoneInput = wrapper.find('#phoneNumber');
    
    // await phoneInput.setValue('12345');
    expect(wrapper.vm.validatePhoneNumber('12345')).toBe(false);

    // await phoneInput.setValue('+989901619642');
    expect(wrapper.vm.validatePhoneNumber('+989901619642')).toBe(true);
  })


  it('stores customer in local storage on form submission', async () => {
    const wrapper = mount(Form);
    await wrapper.setData({
      formData: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+989901618642',
        email: 'john@example.com',
        bankAccountNumber: '123456789012',
      },
    })
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    const storedData = JSON.parse(localStorage.getItem('customerData'));
    
    expect(storedData).toContainEqual({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989901618642',
      email: 'john@example.com',
      bankAccountNumber: '123456789012',
    })
  })


  it('does not store duplicate customer data in local storage', async () => {
    const wrapper = mount(Form);

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      phoneNumber: '+989901618642',
      email: 'john@example.com',
      bankAccountNumber: '123456789012',
    };

    await wrapper.setData({ formData });

    await wrapper.find('form').trigger('submit.prevent');

    await wrapper.vm.$nextTick();

    const storedData = JSON.parse(localStorage.getItem('customerData'))
    expect(storedData).toContainEqual(formData);

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick();

    const storedDataAfterDuplicateSubmission = JSON.parse(localStorage.getItem('customerData'))
    expect(storedDataAfterDuplicateSubmission).toEqual([formData]);
  })



  it('clears the form after submission', async () => {
    const wrapper = mount(Form);
    
    await wrapper.setData({
      formData: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+989901618642',
        email: 'john@example.com',
        bankAccountNumber: '123456789012',
      },
    })
    
    await wrapper.find('form').trigger('submit.prevent');
    
    // Check if the form fields are cleared
    expect(wrapper.vm.formData.firstName).toBe('');
    expect(wrapper.vm.formData.lastName).toBe('');
    expect(wrapper.vm.formData.dateOfBirth).toBe('');
    expect(wrapper.vm.formData.phoneNumber).toBe('');
    expect(wrapper.vm.formData.email).toBe('');
    expect(wrapper.vm.formData.bankAccountNumber).toBe('');
  });


})