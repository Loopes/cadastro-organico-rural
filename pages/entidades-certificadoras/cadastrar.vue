<template>
  <div class="create">
    <Breadcrumb active="Cadsatrar unidade de produção" parent="/entidades-certificadoras" />
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
        { text: 'Entidade Certificadora', to: '/entidades-certificadoras' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
