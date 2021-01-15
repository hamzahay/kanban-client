<template>
  
    <!-- Main Page -->
      <div class="col-md category">
        <div class="card" >
          <h5 class="card-title">{{ cardTitle }}</h5>
          <ul>
            <li class="task-flex" v-for="task in filter" :key="task.id">
            {{ task.title }}
            <div>
            <button class="changeCategory-btn" v-on:click="changeCategory(task.id)">-></button>
            <button class="delete-btn" v-on:click="deleteTask(task.id)">X</button>
            </div>
            </li>
            <br>
          </ul>
          <button v-if="form == false" class="btn" v-on:click="showForm">+</button>
          <task-form 
            v-bind:category="cardTitle"
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
    'cardTitle',
    'category',
    'baseUrl', 
    'tasks',
  ],
  methods: {
    showForm: function () {
      if (this.form == true) {
        this.form = false
      } else {
        this.form = true
      }
      console.log(this.form)
    },
    changeFormStatus: function (form) {
      this.refresh()
      this.form = form
    },
    deleteTask: function (id) {
      axios({
        method: 'DELETE',
        url: `${this.baseUrl}/tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => {
        console.log(response)
        this.refresh()
      })
      .catch(err => {
        console.log(err)
      })
    },
    changeCategory: function (id) {
      let task
      this.tasks.forEach(el => {
        if (el.id == id) {
          task = el
        }
      })
      let index = this.category.indexOf(task.category)
      if (index == this.category.length-1) {
        index = 0
      } else {
        index++
      }
      axios({
        method: 'patch',
        url: `${this.baseUrl}/tasks/${id}`,
        data: {
          category: this.category[index]
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => {
        this.refresh()
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },
    refresh: function () {
      this.$emit('refresh')
    }
  },computed: {
    filter () {
      let tasks = []
      this.tasks.forEach(task => {
        if (this.cardTitle == task.category) {
          tasks.push(task)
        }
      })
      return tasks
    },
  },
}
</script>

<style scoped>

  ul {
    width: 100%;
  }

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

.task-flex {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}

.task-flex:hover {
  transition: all 0.3s ease 0s;
  background-color: rgba(60, 60, 60);
}

.delete-btn {
    border-style: none;
    color: rgba(194, 58, 58, 1);
    background-color: transparent;
    padding: 2px 5px;
    font-size: 15px;
  }

  .changeCategory-btn {
    border-style: none;
    color: cornflowerblue;
    background-color: transparent;
    padding: 2px 5px;
    font-size: 15px;
  }

</style>