<template>
  <div class="create">
    <Breadcrumb active="Cadastrar caderno de campo" parent="/caderno-de-campo" />
    <FieldNotebookForm />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Caderno de campo', to: '/caderno-de-campo' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
