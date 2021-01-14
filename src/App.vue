<template>
  <div>
    <nav-bar v-on:changePage="changePage"></nav-bar>
    <login-form 
    v-if="page == 'login'"
    v-bind:baseUrl="baseUrl"
    v-on:changePage="changePage"
    ></login-form>
    <main-page
    v-else-if="page == 'mainPage'"
    v-bind:baseUrl="baseUrl"
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
    category: [],
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
      this.page = page
      this.checkAuth()
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
        this.getCategory()
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
        this.getAllTasks()
        this.username = localStorage.getItem('username')
        selectedPage = 'mainPage'
      }
      this.page = selectedPage
    },
    getCategory: function () {
      let flag = false
      let data = {}
      this.tasks.forEach(function (task) {
        let key = task.category
        if (data[key] == undefined) {
          data[key] = []
          data[key].push(task)
        } else {
          data[key].push(task)
        }
      })
      console.log(data, "category")
      this.category = data
    },
  },
  created: function () {
    this.checkAuth()
  },
  computed: {
  },
}
</script>

<style>

</style>>