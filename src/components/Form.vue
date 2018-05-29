<template>
  <div>
    <div class="field">
      <label class="label">URL</label>
      <div class="control">
        <input v-model="url" class="input" type="text" placeholder="Enter url name...">
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Due Date</label>
          <div class="control">
            <input v-model="dueDate" class="input" type="text" placeholder="Due Date (06/11/18)">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Instructor</label>
          <div class="control">
            <input v-model="instructor" class="input" type="text" placeholder="Instructor Name">
          </div>
        </div>
      </div>
    </div>
    <button class="button is-primary" @click="postLab()">Submit</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Home',
  data() {
    return {
      url: "",
      dueDate: "",
      instructor: ""
    }
  },
  created() {
  },
  methods: {
    postLab() {
      firebase.database().ref(`labs`).push({
        url: this.url,
        slug: this.url.split("/").pop(),
        dueDate: this.dueDate,
        instructor: this.instructor
      })
    },
    getLab() {
      firebase.database().ref('labs').on('value', (snap) => {
        console.log(snap.val())
      })
    },
    editLab() {
      firebase.database().ref('labs').child(`key`).update({
        body: 'owo'
      })
    },
    deleteLab() {
      firebase.database().ref('posts').child(`key`).remove()
    }
  }
}
</script>
