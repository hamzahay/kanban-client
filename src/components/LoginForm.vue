<template>

  <!-- Login Form -->
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 login-form">
      <form v-on:submit.prevent="login">
        <h2>LOGIN</h2>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" v-model="loginEmail" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="loginPassword" class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <button class="btn btn-light" id="google-btn" v-on:click="loginWithGoogle">
      <img id="google-logo" src="https://1000logos.net/wp-content/uploads/2016/11/google-logo.jpg">
      </button>
    </div>
    <div class="col-md-4"></div>
  </div>
  <!-- Login Form End -->
  
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

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
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('access_token', response.data.access_token)
        this.$emit("changePage", "mainPage")
      })
      .catch(err => {
        if (this.loginEmail == '' || this.password == '') {
          Swal.fire(
            "username & password is required"
          )
        }
      })
    },
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          let id_token = GoogleUser.Bc.id_token

           return axios({
            method: 'post',
            url: `${this.baseUrl}/users/GLogin`,
            data: {
              id_token
            }
          })
        })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('access_token', response.data.access_token)
          this.$emit("changePage", "mainPage")
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>

<style scoped>
  .login-form {
    background-color: rgb(73, 73, 73);
    border: 1px solid black;
    padding: 5px 10px 30px 10px;
    margin-top: 30px;
    border-radius: 5px;
  }

  button {
    margin-top: 10px;
  }

  h2 {
    color: white;
    text-align: center;
    border-bottom: 1px solid black;
  }

  label {
    color: white;
  }

  #google-logo {
    width: 50px;
    height: 24px;
  }
</style>