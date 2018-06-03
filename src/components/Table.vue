<template>
  <div>
    <table class="table is-striped is-hoverable is-fullwidth">
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
            <a :href=lab.fork>
              <button class="button is-info fork">
                <i class="fas fa-fw fa-code-branch"></i>Fork
              </button>
            </a>
          </td>
          <td>
            <button class="button is-danger is-outlined" @click="deleteLab(key)">Delete</button>
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
        const forceNewUpdate = entry[1].lastUpdated ? false : true

        console.log(forceNewUpdate)

        if ((weShouldUpdate && throttle <= 10) || forceNewUpdate) {
          const prCount = await proxy.getPulls(entry[1].slug).catch(e => 32) 
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
      swal({
        title: 'Are you sure?',
        text: "Delete this lab only if you are sure it provides no more value to the board.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: "Nevermind, let's keep it."
      }).then((result) => {
        if (result.value) {
          firebase.database().ref('labs').child(key).remove()
          swal(
            'Deleted!',
            'This lab has successfully deleted.',
            'success'
          )
        }
      }) 
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

.table {
  border-radius: 3px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .5);
}

.fork {
  padding-left: 0.50em;
}

td {
  vertical-align: middle;
}
</style>
