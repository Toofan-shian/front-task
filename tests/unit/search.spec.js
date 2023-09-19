import {mount} from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {


  it('renders a search input', () => {
    let wrapper = mount(Search)
    expect(wrapper.get('#search-field'))
  })
})