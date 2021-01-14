<template>

  <!-- Login Form -->
    <div class="row" id="login-form">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form v-on:submit.prevent="login">
          <input v-model="loginEmail" type="text" placeholder="Email"><br>
          <input v-model="loginPassword" type="password" placeholder="Password"><br>
          <button class="btn btn-primary" id="login-btn" type="submit">Login</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
    <!-- Login Form End -->
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  props: [
    'baseUrl',
  ],
  methods: {
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
        this.$emit("changePage", "mainPage")
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>

</style>