<template>
  <div>
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Link to ZCW Repo</th>
          <th>Due Date</th>
          <th>Instructor</th>
          <th>Progress</th>
          <th>Fork</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Link to ZCW Repo</th>
          <th>Due Date</th>
          <th>Instructor</th>
          <th>Progress</th>
          <th>Fork</th>
          <th>Delete</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(lab, key) in labsList">
          <td>
            <i class="fas fa-fw fa-file-alt" @click="viewReadme(lab.readme)"></i>
            <a :href=lab.url style="color: #3273dc">{{ lab.slug }}</a>
          </td>
          <td>{{ formatDate(lab.dueDate) }}</td>
          <td>{{ lab.instructor }}</td>
          <td>
            <div class="progress__bar">
              <div class="progress__percentage has-text-grey-dark">{{ getPercentage(lab.prCount) }}</div>
              <progress class="progress is-primary" :value=lab.prCount max="38"></progress>
            </div>
          </td>
          <td>
            <a :href=lab.fork><button class="button is-info">Fork</button></a>
          </td>
          <td>
            <button class="button is-danger" @click="deleteLab(key)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'
import proxy from '@/utils/proxy'
import swal from 'sweetalert2'
const moment = require('moment')

export default {
  name: 'Table',
  data() {
    return {
      labsList: {}
    }
  },
  async created() {
    this.getLab()
    this.updatePercentage()
      const event = await firebase.database().ref('labs')
      const snap = await event.once('value')
      const val = await snap.val()

      Object.entries(val).forEach(async (entry) => {
      const readme = "Please don't click this button yet. Thank you."
          firebase.database().ref('labs').child(entry[0]).update(
            {
              readme
            }
          )
      })
  },
  methods: {
    getPercentage(amount) {
      return Math.ceil(amount/38 * 100) + "%"
    },
    async updatePercentage() {
      const event = await firebase.database().ref('labs')
      const snap = await event.once('value')
      const val = await snap.val()

      let throttle = 1
      Object.entries(val).forEach(async (entry) => {
        const weShouldUpdate = moment().diff(moment(entry[1].lastUpdated), 'hours') > 4

        if (weShouldUpdate && throttle <= 10) {
          const prCount = await proxy.getPulls(entry[1].slug)
          const lastUpdated = moment()._d

          firebase.database().ref('labs').child(entry[0]).update(
            {
              lastUpdated,
              prCount 
            }
          )

          throttle += 1
        }
      })
    },
    formatDate(date) {
      return moment(date).format('M/DD')
    },
    viewReadme(html) {
      swal({
        html
      })
    },
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

<style scoped>
.progress__bar {
  position: relative;
}

.progress__percentage {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%)
}

td {
  vertical-align: middle;
}
</style>
