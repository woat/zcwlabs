<template>
  <div>

    <section class="hero is-small is-light zcwlabs__header">
      <div class="hero-body zcwlabs__body">
        <div class="level">
          <div class="level-right">
            <h1 class="title is-1 has-text-info zcwlabs__logo">
              <span class="has-text-primary">ZCW</span>Labs
            </h1>
          </div>
          <div class="level-left">
            <div class="has-text-right">
              <h1 class="title is-4">
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-small is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="box column is-8 is-offset-2">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-small is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <Table class="column" />
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
.box {
  margin-top: 2rem;
  padding: 2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .18);
}

.zcwlabs__header {
  border-top: 4px solid dodgerblue;
}

.zcwlabs__body {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .18);
}

.zcwlabs__logo {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, .1);
}
</style>
