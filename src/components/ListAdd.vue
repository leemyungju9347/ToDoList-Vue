<template>
    <!-- 
    1. 텍스트필드
    2. 추가버튼
   -->
  <div>
    <v-textarea
      outlined
      v-model="memo"
      label="투두리스트를 입력해주세요."
      value=""
      @keypress.enter="enterKey"
    ></v-textarea>
    <v-btn v-if="mode === 'add'" @click="listAdd">리스트추가</v-btn>
    <v-btn v-else @click="listEdit">리스트수정</v-btn>
  </div>
</template>
<script>
import { eventBus } from '../main'

export default{
  data(){
    return{
      memo:null,
      // index:null,
      mode:'add',
      display:null,
      indexNum:0
    }
  },
  created(){
    eventBus.$on('listEdit',(memo,index,mode,display)=>{
        this.memo = memo
        this.index = index
        this.mode = mode
        this.display = display
        
    })
  },
  methods:{
      listAdd(){
        if( this.memo === null ){
          alert('할일을 입력해주세요!')
        }else{
          this.$emit('listAdd',this.memo,this.indexNum);
          this.indexNum++;
          this.memo = null;
          
        }
    },
    listEdit(){
      if( this.memo === null ){
          alert('할일을 입력해주세요!')
        }else{
          this.mode = 'add'
          this.display = 'block'
          this.$emit('listEdit',this.memo,this.index,this.mode,this.display)
          this.memo = null
          //console.log(this);
        }
    },
    enterKey(ev){//replace
    //console.log(typeof(this.memo));
    
      ev.preventDefault();
        if(this.mode === 'add') { 
          if( typeof this.memo == 'string' && this.memo.trim() === '' ) { 
            // memo의 값이 공백이라면 alert 창을 띄워라.
              alert('할 일을 등록해 주세요.') 
              this.memo = null  // enter 로 밑으로 내려가 있는 커서를 다시 올려준다.     
              
          } else {
            //this.memo = this.memo.replace(/\n/g, "")
            
            this.listAdd() // 글자나 숫자 다른게 memo 에 입력되어있다면 listAdd를 실행시킨다.
            
            
          }
      } else { // mode === 'edit' 일때는 
          this.listEdit()
      }
  },
    
  }
  
}
</script>
<style>
</style>