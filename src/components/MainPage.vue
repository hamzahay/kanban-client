<template>

  <div>
    <br>
    <div class="row" id="mainPage">
      <div class="col-md-1"></div>
      <tasks-list 
      v-for="(task, idx) in category" :key="idx" 
      v-bind:task="task"
      v-bind:baseUrl="baseUrl"
      class="col-md-2">
      </tasks-list>
      <div class="col-md-1"></div>
    </div>
  </div>

</template>

<script>
import TasksList from './TasksList'
import TaskForm from './TaskForm'

export default {
  name: 'MainPage',
  data () {
    return {
    }
  },
  components: {
    TasksList,
    TaskForm
  },
  props: [
    'category',
    'baseUrl',
  ],
  methods: {
  },
}
</script>

<style scoped>

</style>