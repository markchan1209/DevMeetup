import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('datefilter', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App), 
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAtpElrw5LGxAsqFEnQBrJY5DYKPX5GhH8",
      authDomain: "devmeetup-c619d.firebaseapp.com",
      databaseURL: "https://devmeetup-c619d.firebaseio.com",
      projectId: "devmeetup-c619d",
      storageBucket: "gs://devmeetup-c619d.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadedMeetups')
  }
}).$mount('#app')
