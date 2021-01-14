<template>
  
  <!-- Navbar --> 
    <nav id="navbar">
      <div id="logo-navbar">KANBAN</div>
      <ul class="navbar-ul">
        <li>{{ username }}</li>
        <li>
          <button id="logout-btn" v-on:click="logout">Logout</button>
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
      username: ''
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('access_token')
      this.$emit('changePage', 'login')
    },
  }
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
  border: 1px solid;
  border-radius: 10px;
  border-color: rgb(71, 71, 71);
}

#navbar button:hover {
  transition: all 0.3s ease 0s;
  background-color: rgba(194, 58, 58, 0.8);
}

#logo-navbar {
  color: white;
  font-size: 25px;
}

</style>