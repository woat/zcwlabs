<template>
  <div>
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Link to ZCW Repo</th>
          <th>Due Date</th>
          <th>Instructor</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Link to ZCW Repo</th>
          <th>Due Date</th>
          <th>Instructor</th>
          <th>Delete</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(lab, key) in labsList">
          <td><a :href=lab.url style="color: #3273dc">{{ lab.slug }}</a></td>
          <td>{{ lab.dueDate }}</td>
          <td>{{ lab.instructor }}</td>
          <td>
            <button class="button is-danger" @click="deleteLab(key)" >Delete</button>
          </td>
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
      })
    },
    deleteLab(key) {
      firebase.database().ref('labs').child(key).remove()
    }
  }
}
</script>
