<template>
  <div>
    <v-card
    :id="index"
    :class="{'done': list.status === 'done', 'edit': list.mode === 'edit'}" 
    v-for="(list,index) in todoList"
    :key="index"
    class="pa-3 mb-3">
      <p>{{ list.memo }}</p>
      <p> star = {{ list.star }}</p> 
      <v-btn
        v-if="list.status === 'created' && list.mode === 'add'"
        @click="$emit('statusControl',index,'done')"
        :disabled="list.display === 'none'"
        fab text small color="green">
        <i class="fas fa-check"></i>
      </v-btn>
      <!--  완료  -->
    
      <v-btn
        v-else-if="list.status === 'done' && list.mode === 'add'"
        @click="$emit('statusControl',index,'created')"
        :disabled="list.display === 'none'"
        fab text small color="blue">
        <i class="fas fa-redo-alt"></i>
      </v-btn>
      <!--  부활  -->

      <v-btn
        v-if="list.mode === 'add'"
        @click="$emit('listDelete',index)"
        :disabled="list.display === 'none'"
        fab text small color="red">
        <i class="fas fa-trash-alt"></i>
      </v-btn>
      <!--  삭제  -->

      <v-btn
        v-if="list.status === 'created' && list.mode ===  'add'"
        @click="listEdit(list.memo,index,'edit','none')"
        :disabled="list.display === 'none'"
        fab text small color="purple">
          <i class="fas fa-edit"></i>
      </v-btn>
      <!--  수정  -->

      <v-btn 
        @click="starOn(index)"
        v-if="list.star === 'none'"
        fab text small color="yellow">
        <i class="far fa-star"></i> 
      </v-btn>
      <!-- 우선순위 적용 -->
      <v-btn  
        @click="starOff(index,list.indexNum)"
        v-else
        fab text small color="yellow">
        <i class="fas fa-star"></i>
      </v-btn>
      <!-- 우선순위 해제 -->
      <p>indexNum = {{ list.indexNum }}</p>
      <!-- <p>{{ list.time }}</p> -->
    </v-card>
    

  </div>
</template>
<script>
import { eventBus } from '../main'

export default{
  props:['todoList'],
  data(){
    return{
      starArray:[],
      starId:null,
      saveId:null
    }
  },
  methods:{
    listEdit(memo,index,mode,display){

        eventBus.listEdit(memo,index,mode,display)
        //mode = 'edit'값으로 변경
        this.todoList[index].mode = mode 
        

        for(let i = 0; i < this.todoList.length; i++){
          if( this.todoList[i].mode === 'add' ){
              this.todoList[i].display = display
              //반복문으로 edit모드가 아닌걸 찾아서 display : 'none'으로 바꿈
          }
      }
    },
    starOn(index){   
      this.todoList[index].star = 'display' // display 변경
      let starOnSave = this.todoList[index] // 해당 index를 저장해둔다.
      
      //배열, index값 복사
      this.starArray = this.todoList.map((toDo)=>{
          return toDo
      })
      
      this.starId = this.todoList.map((toDo,index)=>{
          return index
      })

      this.saveId = index 

      this.todoList.splice(index,1) //삭제
      this.todoList.unshift(starOnSave) //제일 첫번째로 올려줌

    },
    starOff(index,id){
      this.todoList[index].star = 'none' //스타아이콘 지우기

      //let todoOffSave = this.todoList[index]; //내가 선택한 메모
      let starOffSave = this.todoList[index];

      // 1. starArray에서 id값과 같은 id에 위치해있는 배열을 빼온다.

      this.todoList.splice(index,1) // 2. index번째에 있는 현재 우선순위를 지우고,
      this.todoList.splice(id,0,starOffSave)

      // for(let i = 0; i < this.todoList.length; i++){
      //     //console.log(this.todoList[i].indexNum);
      //     if ( this.todoList[i].indexNum === id ){
      //       console.log(this.todoList[i]);
      //     }
      // }

      
    }





    // important(memo,index,onoffImport){
    //   this.$emit(memo,index,onoffImport)
    // }
      // starOn(index){
      //   this.todolist[index].star = 'block' // 해당 메모를 block으로 바꿈
      //   let starOn = this.todolist[index] //해당 메모 저장
      //   this.todolist.splice(index, 1) //지우고
      //   this.todolist.unshift(starOn) //순서를 맨앞에 옮기기
      // },
      // starOff(index){
      //   this.todolist[index].star = 'none' 
      //   let starOff = this.todolist[index]
      //   let star = 0;
      //   for (let i=0; i < this.todolist.length; i++) {
      //     if (this.todolist[i].star === 'block') star++
      //   }
      //   this.todolist.splice(index, 1)
      //   this.todolist.splice(star, 0, starOff)
      // }
  }
}
</script>

<style>
.done{
  background-color: rgba(0, 0, 0, 0.1) !important;
}
.edit{
  background-color: rgba(98, 123, 233, 0.1) !important;
}
.done p {
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.5);
}
</style>