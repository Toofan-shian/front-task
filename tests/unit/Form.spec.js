import {mount} from '@vue/test-utils'
import Form from '@/components/Form'

describe("Form.vue", () => {

  it('renders the form', () => {
    let wrapper = mount(Form)
    expect(wrapper.find('#form').exists()).toBe(true)
  })
})