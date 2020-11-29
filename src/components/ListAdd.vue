<template>
  <div class="listAdd-area">
    <form action="" class="listAdd-form" @submit.prevent="listSubmit">
      <input type="text" class="list-input" v-model="memo" placeholder="할일을 입력해주세요."> 
      <button class="add-btn" v-if="mode === 'add'">
        <span>리스트 추가</span>
        <i class="fas fa-plus"></i>
      </button>
      <button class="edit-btn" v-else>
        <span>리스트 수정</span>
        <i class="fas fa-pen"></i>
      </button>
    </form>
  </div>
</template>
<script>
import {eventBus} from '../main'

export default {
  data(){
    return {
      memo:null,
      index:null,
      mode:'add'
    }
  },
  created(){
    eventBus.$on('listEdit',(memo,index)=>{
      console.log(memo,index);
      this.memo = memo
      this.index = index
      this.mode = 'edit'
    })
  },
  methods: {
    listSubmit() {
      if(this.mode === 'add' ) {
        this.listAdd();
        
      }else {
        this.listEdit();
      }
    },
    listAdd(){
      if( this.memo === null ){
        alert('할일을 입력해주세요!');
      }else {
        this.$emit('listAdd',this.memo)
        this.memo = null
      }
    },
    listEdit(){
      if( this.memo === null ){
        alert('할일을 입력해주세요!');
      }else {
        this.$emit('listEdit',this.memo,this.index)
        this.memo = null
        this.mode = 'add'
      }
    }
  }
}
</script>
<style>
</style>