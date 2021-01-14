<template>
  
    <!-- Main Page -->
      <div class="col-md category">
        <div class="card" >
          <h5 class="card-title">{{ task[0].category }}</h5>
          <ul>
            <li v-for="item in task" :key="item.id">{{ item.title }}</li>
            <br>
          </ul>
          <button v-if="form == false" class="btn" v-on:click="showForm">+</button>
          <task-form 
            v-bind:category="task[0].category"
            v-bind:baseUrl="baseUrl"
            v-else-if="form == true" 
            v-on:changeFormStatus="changeFormStatus"
            ></task-form>
        </div>
      </div>
    <!-- Main Page End -->

</template>

<script>
import axios from 'axios'
import TaskForm from './TaskForm.vue'

export default {
  name: 'TasksList',
  components: {
    TaskForm
  },
  data () {
    return {
      form: false
    }
  },
  props: [ 
    'task',
    'baseUrl', 
  ],
  methods: {
    addTask: function () {

    },
    showForm: function () {
      if (this.form == true) {
        this.form = false
      } else {
        this.form = true
      }
      console.log(this.form)
    },
    changeFormStatus: function (form) {
      console.log('back in list')
      this.form = form
    }
  },
}
</script>

<style scoped>

  

  li, h5 {
    color: white;
  }

  .card-title {
    padding-top: 4px;
    padding-bottom: 5px;
    background-color: rgb(43, 43, 43);
  }

  .card {
  border: 1px solid black;
  background-color: rgb(73, 73, 73);
  align-items: center;
}

.card-title {
  color: white;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid black;
}

.btn {
  color: white;
}

.btn:hover {
  background-color: cornflowerblue;
}

</style>