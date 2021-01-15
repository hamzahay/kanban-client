<template>
  
  <!-- Register Form -->
    <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4 register-form">
      <form v-on:submit.prevent="register">
        <h2>REGISTER</h2>
        <div class="form-group">
          <label>Email address</label>
          <input type="email" v-model="regisEmail" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="regisUsername" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="regisPassword" class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="col-md-4"></div>
  </div>
    <!-- Register Form End -->

</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      regisEmail: '',
      regisUsername: '',
      regisPassword: '',
    }
  },
  props: [
    'baseUrl',
  ],
  methods: {
    register: function () {
      axios({
        method: 'post',
        url: `${this.baseUrl}/users/register`,
        data: {
          email: this.regisEmail,
          username: this.regisUsername,
          password: this.regisPassword,
        }
      })
      .then(response => {
        console.log(response)
        this.$emit('changePage', 'login')
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.register-form {
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
</style>