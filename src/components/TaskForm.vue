<template>
  
    <!-- Task Form -->
      <div id="taskForm">
        <form class="grid-container" v-on:submit.prevent="addTask(); changeFormStatus();">
          <input 
          class="form-input"
          v-model="title" 
          type="text" 
          placeholder="task"
          ><button 
          type="submit" 
          class="form-btn"
          >Submit!</button>
        </form>
      </div>
    <!-- Task Form End -->

</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskForm',
  data () {
    return {
      title: ''
    }
  },
  props: [
    'category',
    'baseUrl',
  ],
  methods: {
    addTask: function () {
      let category = this.category
      let access_token = localStorage.getItem('access_token')

      axios({
        method: 'post',
        url: `${this.baseUrl}/tasks`,
        data: {
          title: this.title,
          category,
        },
        headers: {
          access_token,
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeFormStatus: function () {
      console.log('changeFormStatus')
      this.$emit('changeFormStatus', false)
    }
  }
}
</script>

<style scoped>
  #taskForm {
    width: 100%;
    border-top: 1px solid black;
  }

  form {
    grid-column-start: 1;
    grid-column-end: 3;
    box-sizing: border-box;
  }

  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 0px;
    padding: 0px;
  }

  .form-input {
    width: 100%;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .form-btn {
    border-style: none;
    background-color: cornflowerblue;
    padding: 2px 5px;
    font-size: 15px;
  }
</style>