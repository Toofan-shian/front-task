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
  });
})