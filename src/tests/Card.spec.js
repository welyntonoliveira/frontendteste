import { mount } from '@vue/test-utils';
import Card from '@components/Card.vue'; 
import { createRouter, createWebHistory } from 'vue-router';

describe('Card', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/funcionario/:id', name: 'funcionarioDetalhe', component: { template: '<div>Detalhe do Funcionário</div>' } }
    ]
  });

  const mountComponent = (props) => {
    return mount(Card, {
      global: {
        plugins: [router]
      },
      props
    });
  };

  it('renders correctly with given props', () => {
    const wrapper = mountComponent({
      avatar: 'http://example.com/avatar.jpg',
      nome: 'John Doe',
      code: '1234',
      id: '1',
      status: true,
      vermais: true
    });

    expect(wrapper.find('img').attributes('src')).toBe('http://example.com/avatar.jpg');
    expect(wrapper.find('h3').text()).toBe('John Doe');
    expect(wrapper.find('.info-funcionario_cod p').text()).toBe('Código: 1234');
    expect(wrapper.find('.bandeira').text()).toBe('ativo');
    expect(wrapper.find('.bandeira').classes()).toContain('bandeira_ativo');
  });

  it('renders "Ver mais" button when vermais is true', () => {
    const wrapper = mountComponent({
      avatar: 'http://example.com/avatar.jpg',
      nome: 'John Doe',
      code: '1234',
      id: '1',
      status: true,
      vermais: true
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Ver mais');
  });

  it('does not render "Ver mais" button when vermais is false', () => {
    const wrapper = mountComponent({
      avatar: 'http://example.com/avatar.jpg',
      nome: 'John Doe',
      code: '1234',
      id: '1',
      status: true,
      vermais: false
    });

    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('displays the correct status class based on the status prop', () => {
    const wrapper = mountComponent({
      avatar: 'http://example.com/avatar.jpg',
      nome: 'John Doe',
      code: '1234',
      id: '1',
      status: false,
      vermais: true
    });

    expect(wrapper.find('.bandeira').text()).toBe('inativo');
    expect(wrapper.find('.bandeira').classes()).toContain('bandeira_inativo');
  });
});
