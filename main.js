const app = new Vue ({
  el: '#app',
  data: {
    username: '',
    tasks: '',
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
    addBacklog: function () {
      this.tasks.push(this.backlog)
      this.backlog = ''
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
        this.getAllTasks()
        this.username = localStorage.getItem('username')
        selectedPage = 'mainPage'
      }
      this.page = selectedPage
    },
    getAllTodo: function () {
      let allTasks = this.tasks
      let todo = allTasks.filter(function (task) {
        return task.category == 'todo'
      })
      return todo
    }
  },
  created: function () {
    this.checkAuth()
  },
  computed: {
    getTodo: function () {
      let todo = this.getAllTodo()
      return todo
    },
  }
})
