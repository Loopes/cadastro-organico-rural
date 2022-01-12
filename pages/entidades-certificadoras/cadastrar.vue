<template>
  <div class="create">
    <Breadcrumb active="Cadsatrar entidade certificadora" parent="/entidades-certificadoras" />
    <CertifyingEntityForm />
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Entidades certificadoras', to: '/entidades-certificadoras' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
