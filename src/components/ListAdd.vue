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
// import { eventBus } from '../main'

// export default{
//   data(){
//     return{
//       memo:null,
//       // index:null,
//       mode:'add',
//       display:null,
//       indexNum:0
//     }
//   },
//   created(){
//     eventBus.$on('listEdit',(memo,index,mode,display)=>{
//         this.memo = memo
//         this.index = index
//         this.mode = mode
//         this.display = display
        
//     })
//   },
//   methods:{
//       listAdd(){
//         if( this.memo === null ){
//           alert('할일을 입력해주세요!')
//         }else{
//           this.$emit('listAdd',this.memo,this.indexNum);
//           this.indexNum++;
//           this.memo = null;
          
//         }
//     },
//     listEdit(){
//       if( this.memo === null ){
//           alert('할일을 입력해주세요!')
//         }else{
//           this.mode = 'add'
//           this.display = 'block'
//           this.$emit('listEdit',this.memo,this.index,this.mode,this.display)
//           this.memo = null
//           //console.log(this);
//         }
//     },
//     enterKey(ev){//replace
//     //console.log(typeof(this.memo));
    
//       ev.preventDefault();
//         if(this.mode === 'add') { 
//           if( typeof this.memo == 'string' && this.memo.trim() === '' ) { 
//             // memo의 값이 공백이라면 alert 창을 띄워라.
//               alert('할 일을 등록해 주세요.') 
//               this.memo = null  // enter 로 밑으로 내려가 있는 커서를 다시 올려준다.     
              
//           } else {
//             //this.memo = this.memo.replace(/\n/g, "")
            
//             this.listAdd() // 글자나 숫자 다른게 memo 에 입력되어있다면 listAdd를 실행시킨다.
            
            
//           }
//       } else { // mode === 'edit' 일때는 
//           this.listEdit()
//       }
//   },
    
//   }
  
// }
</script>
<style>
</style>