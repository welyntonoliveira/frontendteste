<template>
    <header class="container_header">
        <div class="header_logo">
          <img src="/image/logo.jpg" alt="Logo">
        </div>
        <h3>Controle de funcionários</h3>
    </header>
</template>
<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Header'
}
</script>

<style scoped>
.container_header {
  width: 100%;
  border-bottom: 2px solid rgba(33,33,33,0.3);
  margin-bottom: 32px;
  background: #fff;
  padding: 8px 32px;
  margin: 0 0 48px;
  display: flex;
  flex-direction: row;
  gap: 34px;
  align-items: center;
}

.header_logo img {
  width: 50px;
  height: auto;
}
</style>
