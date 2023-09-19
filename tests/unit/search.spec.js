import {mount} from '@vue/test-utils'
import Search from '@/components/Search.vue'

describe('Search.vue', () => {


  it('renders a search input', () => {
    let wrapper = mount(Search)
    expect(wrapper.get('#search-field'))
  })


  it('displays matching customers when searching by name', async () => {
    // Set up the initial data in local storage
    localStorage.setItem('customerData', JSON.stringify([
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' },
    ]));
  
    const wrapper = mount(Search);
  
    const input = wrapper.find('#search-field');
  
    await input.setValue('John');
  
    await wrapper.vm.$nextTick();
  
    const searchResults = wrapper.findAll('ul li');
    expect(searchResults.length).toBe(1)
  });
})