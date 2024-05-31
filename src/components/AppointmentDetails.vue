<template>
    <div class="apontamento-container">
      <h2 v-if="apontamentos.length > 0">
        Apontamentos
      </h2>
      <p v-else>Funcionário não possui informações sobre apontamentos de horas.</p>
      <div v-for="apontamento in apontamentos" :key="apontamento.id" class="container_apontamentos_info_atividades">
        <h3>Boletins</h3>
        <p><b>Início:</b> {{ formattedStartDate(apontamento.startDate) }} - <b>Término:</b> {{ formattedEndDate(apontamento.endDate) }}</p>
        <h4>Atividades</h4>
        <ul v-if="apontamento.appointments.length > 0">
          <li v-for="innerapontamento in apontamento.appointments" :key="innerapontamento.id">
            <a href="#" @click.prevent="showActivityDetails(innerapontamento.activityId)">- Atividade ID: {{ innerapontamento.id }}</a><br>
            - Data: {{ formattedStartDate(innerapontamento.date) }}
          </li>
        </ul>
        <p v-else>Funcionário não possui informações de atividades realizadas nesse período.</p>
      </div>
      <!-- Overlay -->
      <div v-if="atividade" class="overlay" @click="closeActivityDetails"></div>
      <!-- Modal para exibir detalhes da atividade -->
      <div v-if="atividade" class="activity-modal">
        <h3>Detalhes da Atividade</h3>
        <p><b>ID:</b> {{ atividade.id }}</p>
        <p><b>Código:</b> {{ atividade.code }}</p>
        <p><b><span class="info_color" :style="{ backgroundColor: atividade.color }"></span> Descrição:</b> {{ atividade.description }}</p>
        <button @click="closeActivityDetails">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    props: {
      apontamentos: Array, 
    },
    setup() {
      const atividade = ref(null);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      const showActivityDetails = async (activityId) => {
        try {
          const response = await fetch('/assets/data/atividades.json');
          if (!response.ok) {
            throw new Error('Erro ao carregar os dados das atividades');
          }
          const data = await response.json();
          atividade.value = data.find(atv => atv.id === activityId);
        } catch (error) {
          console.error(error.message);
        }
      };

      const closeActivityDetails = () => {
        atividade.value = null;
      };

      return {
        formatDate,
        showActivityDetails,
        closeActivityDetails,
        atividade
      };
    },   
    computed: {
      formattedStartDate() {
        return this.formatDate;
      },
      formattedEndDate() {
        return this.formatDate;
      }
    }
  };
  </script>
  
  <style scoped>
  .apontamento-container {
    background-color: #fff;
    border: 1px solid rgba(33,33,33,0.3);
    border-radius: 4px;
    padding: 16px;
    -webkit-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    -moz-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    margin: 54px 0;
  }

  .container_apontamentos_info_atividades {
    margin-bottom: 24px;
  }
  
  .apontamento-container h2 {
    margin-bottom: 1em;
  }

  .apontamento-container h2,
  .apontamento-container h3 {
    margin-bottom: 0.5em;
  }

  .apontamento-container h4 {
    margin: 0.5em 1em;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .activity-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    min-width: 500px;
  }

  .activity-modal button {
    margin: 16px 0 0;
  }

  .activity-modal p {
    line-height: 2.5em;
  }

  .info_color {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: text-bottom;
  }

  @media (max-width: 600px) {
    .activity-modal {
      min-width: 90%;
    }
  }
  </style>