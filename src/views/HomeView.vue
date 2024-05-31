<template>
  <main class="container">
    <h1>Dashboad</h1>
    <div class="home_container-filtros">
      <input type="text"  v-model="pesquisaTermo" @input="filtrarFuncionarios" placeholder="Pesquisar funcionário">
      <select v-model="filtroStatus" @change="filtrarFuncionarios">
        <option value="">Todos</option>
        <option value="true">Ativo</option>
        <option value="false">Inativo</option>
      </select>
    </div>
    <div class="home_container-card">
      <Card
        v-for="(funcionario, index) in funcionariosFiltrados"
        :key="index"
        :id="funcionario.code"
        :avatar="funcionario.image"
        :nome="funcionario.name"
        :code="funcionario.code"
        :status="funcionario.active"
        :vermais=true
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch} from 'vue';
import Card from '../components/Card.vue';

const funcionarios = ref([]);
const pesquisaTermo = ref('');
const filtroStatus = ref('');

const fetchFuncionario = async () => {
  try {

    const response = await fetch('/assets/data/funcionarios.json');

    if (!response.ok) {
      throw new Error('Erro ao carregar os dados dos funcionários');
    }

    const data = await response.json();

    funcionarios.value = data;
  } catch (error: any) {
    console.error(error.message);
  }
};

onMounted(() => {
  fetchFuncionario();
});

const filtrarFuncionarios = () => {

};

const funcionariosFiltrados = computed(() => {
  return funcionarios.value.filter(funcionario => {
    const termoLower = pesquisaTermo.value.toLowerCase().trim();
    const nomeLower = funcionario.name.toLowerCase().trim();
    if (termoLower && !nomeLower.includes(termoLower)) {
      return false;
    }

    if (filtroStatus.value !== '') {
      const status = funcionario.active.toString();
      if (status !== filtroStatus.value) {
        return false;
      }
    }

    return true;
  });
});

</script>

<style scoped>
.home_container-filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  margin: 48px 0;
  background: #fff;
  width: 100%;
  padding: 16px 32px;
  border: 1px solid rgba(33,33,33,0.3);
  -webkit-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
  -moz-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
  box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
  border-radius: 4px;
}

.home_container-filtros input {
  min-width: 400px;
}

.home_container-filtros select {
  min-width: 200px;
}
.home_container-card {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  margin: 32px 0;
}

@media (max-width: 600px) {
  .home_container-filtros input, .home_container-filtros select {
    min-width: 100%;
  }
}
</style>