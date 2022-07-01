<template>
  <div class="create">
    <Breadcrumb active="Check Lists" parent="/check-lists" />
    <CheckListsForm />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Check Lists', to: '/check-lists' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
