<template>
  <div class="list-area">
    <transition-group tag="ul" name="list">
      <li v-for="(list,index) in todoList" :key="index + 0" 
      :class="{
        'checked':list.status === 'done', 
        edit: list.mode === 'edit'}"
        >
        <input class="checkbox" type="checkbox" name="" id="check">
        <label for="check" @click="statusControl($event,index)" name="done">
            <span>
              <i class="fas fa-check"></i>
            </span>
        </label>
        <p class="todo-txt">
          {{ list.memo }}
        </p>
        <span class="edit-message">수정중..</span>
        <!-- 버튼 박스 -->
        <div class="btn-box">
          <!-- 수정 버튼 -->
          <button class="edit-btn"
            @click="listEdit(list.memo,index)"
            v-if="list.status === 'created'" 
            :disabled="editMode"
          >
            <i class="fas fa-pen" :style="{color:editModeBlue}"></i>
          </button>
          <!-- 삭제 버튼 -->
          <button class="delete-btn" 
            @click="$emit('listDelete',index)"
            :disabled="editMode"
          >
            <i class="fas fa-trash-alt" :style="{color:editModeRed}"></i>
          </button>
        </div>
      </li>
    </transition-group>
    <!-- 전체삭제 버튼 -->
    <button v-if="todoList.length > 0" class="clear-btn" 
      @click="$emit('listClear')" 
      :disabled="editMode"
      >
        delete all
      </button>
  </div>
</template>
<script>
import {eventBus} from '../main'
export default {
  props:['todoList','editMode'],
  computed:{
    editModeBlue() {
      return this.editMode ? '#a6a6a6' : '#5563a2'
    },
    editModeRed() {
      return this.editMode ? '#a6a6a6' : ' #ff3d48'
    },
  },
  methods:{
    listEdit(memo,index){
      eventBus.listEdit(memo,index);
      if( this.todoList[index].mode === 'add' ) {
        this.todoList[index].mode = 'edit';
        this.$emit('editBtnControl',true)
      }
    },
    statusControl(event,index){
      if (this.editMode) return

      if( this.todoList[index].status === 'created' ) {
        this.$emit('statusControl',index,'done');
      }else{
        this.$emit('statusControl',index,'created');
      }
    }
  }
}
</script>

<style>
</style>