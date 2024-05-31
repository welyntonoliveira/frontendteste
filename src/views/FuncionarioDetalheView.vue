<!-- src/views/funcionarioDetail.vue -->
<template>
    <main class="container">
        <h1>Detalhes do Funcionário</h1>
        <div class="container_funcionario">
          <div v-if="funcionario">
            <Card class="container_funcionario_detalhe"
              :key="index"
              :id="funcionario.code"
              :avatar="funcionario.image"
              :nome="funcionario.name"
              :code="funcionario.code"
              :status="funcionario.active"
              :vermais=false
            />
          </div>
          <div v-else>
              <p>Carregando dados do funcionário...</p>
          </div>
        </div>
        <div class="container_apontamentos">
          <div v-if="apontamentos">
            <AppointmentDetails :apontamentos="apontamentos"></AppointmentDetails>
          </div>
          <div v-else>
              <p>Sem dados de apontamentos ...</p>
          </div>
        </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import AppointmentDetails from '../components/AppointmentDetails.vue';
  import Card from '../components/Card.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const funcionario = ref(null);
  const apontamentos = ref([]);
  
  const fetchFuncionario = async (id) => {
    try {
      const response = await fetch('/assets/data/funcionarios.json');

      if (!response.ok) {
        throw new Error('Erro ao carregar os dados dos funcionários');
      }
      const data = await response.json();
      funcionario.value = data.find(emp => emp.code === id);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const fetchApontamento = async (id) => {
    try {
      const response = await fetch('/assets/data/boletins.json');

      if (!response.ok) {
        throw new Error('Erro ao carregar os dados dos apontamentos');
      }

      const data= await response.json();
      apontamentos.value = data.filter(apt => apt.employeeId == id);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  onMounted(() => {
    const id = route.params.id;
    fetchFuncionario(id);
    fetchApontamento(id);
  });
  </script>
  
<style scoped>
.container_funcionario_detalhe {
  margin-top: 54px;
  flex-flow: row;
  gap: 16px;
  justify-content: flex-start;
}
</style>