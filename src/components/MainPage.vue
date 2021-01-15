<template>

  <div>
    <br>
    <div class="row" id="mainPage">
      <div class="col-md-1"></div>
      <tasks-list 
      v-on:refresh="$emit('refresh')"
      v-for="(item, idx) in category" :key="idx" 
      v-bind:tasks="tasks"
      v-bind:baseUrl="baseUrl"
      v-bind:cardTitle="item"
      v-bind:category="category"
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
    'tasks',
    'category',
    'baseUrl',
  ],
}
</script>

<style scoped>

</style>