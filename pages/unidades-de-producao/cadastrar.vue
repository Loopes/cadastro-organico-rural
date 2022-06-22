<template>
  <div class="create">
    <Breadcrumb active="Cadastrar unidade de produção" parent="/unidades-de-producao" />
    <ProductionUnitForm />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Unidades de produção', to: '/unidades-de-producao' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
