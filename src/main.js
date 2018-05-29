// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
const config = {
  apiKey: "AIzaSyAb8t9iMRvKVyqC970j8OF5CHlivZ46_C4",
  authDomain: "zcw-labs.firebaseapp.com",
  databaseURL: "https://zcw-labs.firebaseio.com",
  projectId: "zcw-labs",
  storageBucket: "zcw-labs.appspot.com",
  messagingSenderId: "281905244057"
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App  },
      router
    })
  }
});
