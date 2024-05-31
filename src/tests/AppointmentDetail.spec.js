import { mount } from '@vue/test-utils';
import ApontamentoComponent from '@components/AppointmentDetails.vue';

describe('ApontamentoComponent', () => {
  let wrapper;

  const apontamentosMock = [
    {
      id: 1,
      startDate: '2024-05-01T08:00:00',
      endDate: '2024-05-01T17:00:00',
      appointments: [
        { id: 1, date: '2024-05-01T10:00:00', activityId: 101 },
        { id: 2, date: '2024-05-01T11:00:00', activityId: 102 }
      ]
    }
  ];

  beforeEach(() => {
    wrapper = mount(ApontamentoComponent, {
      props: {
        apontamentos: apontamentosMock
      }
    });
  });

  it('renders correctly when there are apontamentos', () => {
    expect(wrapper.find('h2').text()).toBe('Apontamentos');
    expect(wrapper.findAll('.container_apontamentos_info_atividades').length).toBe(1);
    expect(wrapper.findAll('li').length).toBe(2);
  });

  it('renders correctly when there are no apontamentos', async () => {
    await wrapper.setProps({ apontamentos: [] });
    expect(wrapper.find('p').text()).toBe('Funcionário não possui informações sobre apontamentos de horas.');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
