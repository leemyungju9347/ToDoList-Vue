<template>
  <div class="header">
      <h1>TO DO LIST</h1>
      <span class="date">{{ today() }}</span>
      <p>total : {{ countDone }} / done : {{ todoList.length }}</p>

  </div>
</template>

<script>
import { todayForm } from '../utils/date'
export default {
  props:['todoList'],
  computed:{
    countDone(){
      let count = 0;
      this.todoList.forEach(list => {
          if(list.status === 'done' ) count++
      })

      return count
    }
  },
  methods:{
    today(){
      return todayForm()
    }
  }
}
</script>

<style>

</style>