<template>
  <div>
    <nav-bar 
    v-on:changePage="changePage" 
    v-bind:logedIn="logedIn"
    v-bind:username="username"
    v-bind:page="page"
    ></nav-bar>
    <login-form 
    v-if="page == 'login'"
    v-bind:baseUrl="baseUrl"
    v-on:changePage="changePage"
    ></login-form>
    <register-form 
    v-bind:baseUrl="baseUrl" 
    v-else-if="page == 'register'"
    v-on:changePage="changePage"
    ></register-form>
    <main-page
    v-on:refresh="refresh"
    v-else-if="page == 'mainPage'"
    v-bind:baseUrl="baseUrl"
    v-bind:tasks="tasks"
    v-bind:category="category"
    ></main-page>
  </div>
</template>

<script>
import axios from 'axios'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import RegisterForm from './components/RegisterForm'
import MainPage from './components/MainPage'

export default {
  name: 'App',
  data () {
    return {
    username: '',
    tasks: [],
    backlog: '',
    done: '',
    page: '',
    baseUrl: 'http://localhost:3000',
    category: [
      'Backlog',
      'Todo',
      'Doing',
      'Done',
    ],
    logedIn: '',
    }
  },
  components: {
    LoginForm,
    NavBar,
    RegisterForm,
    MainPage
  },
  methods: {
    changePage: function (page) {
      this.logedIn = false
      if (page == 'login' || page == 'mainPage') {
        this.checkAuth()
      } else {
        this.page = page
      }
    },
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
    checkAuth: function () {
      let selectedPage = ''
      if (!localStorage.getItem('access_token')) {
        this.logedIn = false
        selectedPage = 'login'
      } else {
        this.logedIn = true
        this.getAllTasks()
        this.username = localStorage.getItem('username')
        selectedPage = 'mainPage'
      }
      this.page = selectedPage
    },
    refresh: function () {
      this.checkAuth()
    }
  },
  created: function () {
    this.checkAuth()
  },
}
</script>

<style>

</style>>