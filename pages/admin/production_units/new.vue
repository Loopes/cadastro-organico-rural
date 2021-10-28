<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <ProductionUnitForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Unidades de produção', to: '/admin/production_units' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
