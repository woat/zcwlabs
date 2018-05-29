<template>
  <div>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <Form class="column is-6 is-offset-3" />
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <Table class="column is-6 is-offset-3" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: { Form, Table }
}

</script>

<style scoped>

</style>
