<template>
  
  <!-- Register Form -->
    <div class="row" id="regis-form">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form v-on:submit.prevent="register">
          <input v-model="regisEmail" type="text" placeholder="Email"><br>
          <input v-model="regisUsername" type="text" placeholder="Username"><br>
          <input v-model="regisPassword" type="password" placeholder="Password"><br>
          <button class="btn btn-primary" id="regis-btn" type="submit">Register</button>
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
  }
}
</script>

<style scoped>

</style>