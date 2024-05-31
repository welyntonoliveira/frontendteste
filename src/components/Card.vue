<template>
    <div class="card">
        <div class="container_avatar-funcionario">
            <img :src="avatar" alt="Avatar do funcionário" />
            <div class="info-funcionarios_status">
                <span :class="[status ? 'bandeira_ativo' : 'bandeira_inativo', 'bandeira']">{{status? "ativo" : "inativo"}}</span>
            </div>
        </div>
        <div :class="[vermais ? 'info_home' : 'info_detalhes', 'container_info-funcionario']">
            <div class="info-funcionario_nome">
                <h3>{{ nome }}</h3>
            </div>
            <div class="info-funcionario_cod">
                <p>Código: {{ code }}</p>
            </div>
            <div class="info_acao-funcionario">
                <button v-if="vermais" @click="navigateToDetail">Ver mais</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

// Definindo as props do componente
const props = defineProps<{
    avatar: string,
    nome: string,
    code: string,
    id: [String, Number],
    status: boolean,
    vermais: boolean,
}>();

const router = useRouter();

const navigateToDetail = () => {
    router.push({ name: 'funcionarioDetalhe', params: { id: props.id } });
};

</script>


<style scoped>
.card {
    background-color: #fff;
    border: 1px solid rgba(33,33,33,0.3);
    border-radius: 4px;
    padding: 16px;
    -webkit-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    -moz-box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    box-shadow: 0px 0px 1px 0px rgba(33,33,33,0.3);
    display: flex;
    flex-flow: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    min-width: 250px;
}

.container_info-funcionario {
    width: 100%;
    text-align: center;
}

.container_avatar-funcionario img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: none;
}

.info-funcionario_nome h3{
    font-weight: 700;
}

.info-funcionarios_status {
    margin: 4px 0 0;
    text-align: center;
}

.bandeira {
    font-weight: 700;
    line-height: 1.2em;
    letter-spacing: 1px;
}

.bandeira_ativo {
    color: #2E9629;
}

.bandeira_inativo {
    color: #B83235;
}

.info_acao-funcionario {
    text-align: center;
    margin: 24px 0 0;
}

.info_detalhes {
    text-align: left;
}

@media (max-width: 600px) {
    .card {
    min-width: 100%;
  }
}
</style>
