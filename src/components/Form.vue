<template>
  <div>
    <div class="field">
      <label class="label" for="url">URL</label>
      <div class="control">
        <input name="url" v-model="url" class="input" type="text" placeholder="Enter url name...">
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label" for="dueDate">Due Date</label>
          <div class="control">
            <input name="dueDate" v-model="dueDate" class="input" type="date" placeholder="Due Date (06/11/18)">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Instructor</label>
          <div class="control">
            <div class="dropdown" @click="toggleDropdown()">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>{{ instructor }}</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-content">
                  <a class="dropdown-item" @click="selectInstructor">Kris &#x1F36B;</a>
                  <a class="dropdown-item" @click="selectInstructor">Froilan &#x1F367;</a>
                  <a class="dropdown-item" @click="selectInstructor">Dolio &#x1F35F;</a>
                  <a class="dropdown-item" @click="selectInstructor">Nhu &#x1F36A;</a>
                </div>
              </div>
            </div>
            <!-- <input v-model="instructor" class="input" type="text" placeholder="Instructor Name"> -->
          </div>
        </div>
      </div>
    </div>
    <button class="button is-primary" @click="postLab()">Submit</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import proxy from '@/utils/proxy'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  data() {
    return {
      url: "",
      dueDate: "",
      instructor: "Choose Instructor"
    }
  },
  methods: {
    async postLab() {

      const slug = this.url.split("/").pop()
      const id = await this.getFork(slug)
      const fork = await `https://git.zipcode.rocks/repo/fork/${id}`
      firebase.database().ref(`labs`).push({
        url: this.url,
        dueDate: this.dueDate,
        instructor: this.instructor,
        prCount: 0,
        readme: null,
        slug,
        fork
      })
      this.url = ''
      this.dueDate = ''
      this.instructor = "Choose Instructor"
      Swal({
        title: 'Lab successfully posted!',
        text: 'Your contribution is super appreciated by everyone in the class (but mostly me, tyty)!',
        type: 'success',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          center left
          no-repeat`
      })
    },
    async getFork(slug) {
      return await proxy.getFork(slug);
    },
    toggleDropdown() {
      document.querySelector('.dropdown').classList.toggle('is-active')
    },
    selectInstructor(e) {
      this.instructor = e.srcElement.innerText
    },
    getLab() {
      firebase.database().ref('labs').on('value', (snap) => {
        console.log(snap.val())
      })
    },
    editlab() {
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

<style>
.dropdown {
  width: 100%;
}

.dropdown * {
  width: inherit;
}

.dropdown-trigger > * {
  text-align: left;
}
</style>
