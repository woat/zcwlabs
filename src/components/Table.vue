<template>
  <div>
    <table class="table is-bordered is-striped is-hoverable">
      <thead>
        <tr>
          <th>Link to URL</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Link to URL</th>
          <th>Due Date</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="lab in labsList">
          <td><a :href=lab.url >{{ lab.slug }}</a></td>
          <td>{{ lab.dueDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Table',
  created() {
    this.getLab()
  },
  data() {
    return {
      labsList: []
    }
  },
  methods: {
    getLab() {
      firebase.database().ref('labs').on('value', (snap) => {
        this.labsList = snap.val()
        console.log(this.labsList)
      })
    }
  }
}
</script>
