<template>
  <div class="create">
    <Breadcrumb active="Check Lists | Referências" parent="/check-lists/references" />
    <CheckListsReferencesForm />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Check Lists | Referências', to: '/check-lists/references' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
