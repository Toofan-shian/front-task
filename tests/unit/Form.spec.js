import {mount} from '@vue/test-utils'
import Form from '@/components/Form'

describe("Form.vue", () => {

  it('renders the form', () => {
    let wrapper = mount(Form)
    expect(wrapper.find('#form').exists()).toBe(true)
  })

  it('renders form inputs', () => {
    const wrapper = mount(Form);
    expect(wrapper.find('#firstName').exists()).toBe(true);
    expect(wrapper.find('#lastName').exists()).toBe(true);
    expect(wrapper.find('#dob').exists()).toBe(true);
    expect(wrapper.find('#phoneNumber').exists()).toBe(true);
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#bankAccount').exists()).toBe(true);
  })


  it('validates email correctly', async () => {
    const wrapper = mount(Form);
    const emailInput = wrapper.find('#email');
    
    await emailInput.setValue('wrong');
    expect(wrapper.vm.validateEmail('wrong')).toBe(false);
    
    await emailInput.setValue('correct@example.com');
    expect(wrapper.vm.validateEmail('correct@example.com')).toBe(true);
  })
  
})