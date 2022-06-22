<template>
  <div class="create">
    <Breadcrumb active="Cadastrar insumo" parent="/insumos" />
    <RawMaterialForm />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Insumos', to: '/insumos' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
