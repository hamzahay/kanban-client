import Vue from 'vue';
import App from './App.vue';

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '627068272540-v2oroqpdufel89n5o0ofk01864bu736r.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue ({
  render: h => h(App)
}).$mount('#app');



/*
const app = new Vue ({
  el: '#app',
  data: {
    username: '',
    tasks: [],
    backlog: '',
    done: '',
    loginEmail: '',
    loginPassword: '',
    regisEmail: '',
    regisUsername: '',
    regisPassword: '',
    page: '',
    baseUrl: 'http://localhost:3000',
  },
  methods: {
    getAllTasks: function () {
      axios({
        method: 'get',
        url: `${this.baseUrl}/tasks`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.tasks = response.data
      })
      .catch(err => {
        console.log(err)
      })
    },
    logout: function () {
      localStorage.removeItem('access_token')
      this.checkAuth()
    },
    login: function () {
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/login`,
        data: {
          email: this.loginEmail,
          password: this.loginPassword,
        }
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('access_token', response.data.access_token)
        this.checkAuth()
      })
      .catch(err => {
        console.log(err)
      })
    },
    checkAuth: function () {
      let selectedPage = ''
      if (!localStorage.getItem('access_token')) {
        selectedPage = 'login'
      } else {
        this.username = localStorage.getItem('username')
        selectedPage = 'mainPage'
      }
      this.page = selectedPage
    },
    todos: function () {
      let todos = this.getTodo()
      this
    }
  },
  created: function () {
    this.getAllTasks()
    this.checkAuth()
  },
  computed: {
    getTodo: function () {
      return this.tasks.filter(function (task) {
        return task.category == 'todo'
      })
    },
    getCategory: function () {
      let category = []
      this.tasks.forEach( function (task) {
        let key = task.category
        let sameCategory = false
        category.forEach(function (el) {
          if (key == el)
        })
      })
    },
  }
})
*/