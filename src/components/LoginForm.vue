<template>

  <!-- Login Form -->
    <div class="grid-container">
      <div id="login-form">
        <form v-on:submit.prevent="login">
          <input v-model="loginEmail" type="text" placeholder="Email"><br>
          <input v-model="loginPassword" type="password" placeholder="Password"><br>
          <div>
          <button class="btn btn-primary" id="login-btn" type="submit">Login</button>
          </div>
        </form>
        <button v-on:click="loginWithGoogle">google</button>
      </div>
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
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // on success do something
          console.log('GoogleUser', GoogleUser.Bc.id_token)
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

  .grid-container {
    padding: 20px 10px;
    display: grid;
    grid-template-columns: auto auto auto;
    
  }

  #login-form {
    padding: 20px 10px;
    justify-self: center;
    grid-column-start: 2;
    grid-column-end: 2;
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgb(73, 73, 73);
  }

  input, button {
    margin-top: 5px;
  }

</style>