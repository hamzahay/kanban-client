<template>
  
  <!-- Navbar --> 
    <nav id="navbar">
      <div id="logo-navbar" v-on:click="$emit('changePage', 'mainPage')">KANBAN</div>
      <ul class="navbar-ul">
        <li v-if="logedIn == true">{{ username }}</li>
        <li v-if="logedIn == true">
          <button id="logout-btn" v-on:click="logout">Logout</button>
        </li>
        <li v-else-if="logedIn == false && page == 'login'">
          <button id="regis-btn" v-on:click="register">Register</button>
        </li>
        <li v-else-if="logedIn == false && page == 'register'">
          <button id="login-btn" v-on:click="$emit('changePage', 'login')">Login</button>
        </li>
      </ul>
    </nav>
    <!-- Navbar End -->

</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  props: [
    'logedIn',
    'username',
    'page',
  ],
  methods: {
    logout: function () {
      localStorage.removeItem('access_token')
      this.$emit('changePage', 'login')
    },
    register: function () {
      console.log('in register')
      this.$emit('changePage', 'register')
    },
  },
}
</script>

<style scoped>

  #navbar {
  background-color: rgb(51, 51, 51);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 1%;
}

li, button {
  font-weight: 500;
  font-size: 16px;
  color: whitesmoke;
  text-decoration: none;
}

.navbar-ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.navbar-ul li {
  display: inline-block;
  padding: 0px 20px;
}

#navbar button {
  background-color: rgb(71, 71, 71);
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 10px;
  border-color: rgb(71, 71, 71);
}

#logout-btn:hover {
  transition: all 0.3s ease 0s;
  background-color: rgba(194, 58, 58, 0.8);
  border: 1px solid rgba(194, 58, 58, 0.8);
}

#regis-btn:hover {
  transition: all 0.3s ease 0s;
  background-color: cornflowerblue;
  border: 1px solid cornflowerblue;
}
#login-btn:hover {
  transition: all 0.3s ease 0s;
  background-color: cornflowerblue;
  border: 1px solid cornflowerblue;
}

#logo-navbar {
  color: white;
  font-size: 25px;
}

</style>