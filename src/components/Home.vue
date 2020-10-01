<template>
    <div class="home">
        <p>전체할일: {{ todoList.length }} / 완료된 할일: {{ countDone }} / 남은할일: {{ todoList.length - countDone }}</p>
        <AppHeader></AppHeader>
        <ListAdd
            @listAdd="listAdd"
            @listEdit="listEdit"
        ></ListAdd>
        <List 
        :todoList="todoList"
        @statusControl="statusControl"
        @listDelete="listDelete"
        ></List>
    </div>
  <!-- <v-container>
      <v-layout row wrap>
        <v-flex xs12 text-center pb-3>
            <h1>투두리스트</h1>
            <p v-bind="realTime()">{{ toDay }}</p>
        </v-flex>
        <v-flex xs6 pa-2>
            <List  
                @statusControl="statusControl"
                @listDelete="listDelete"
                :todoList="todoList"
            ></List>
        </v-flex>
        <v-flex xs6 pa-2>
            <ListAdd
                @listAdd="listAdd"
                @listEdit="listEdit"
            ></ListAdd>
        </v-flex>
      </v-layout>
  </v-container> -->
</template>
<script>
import List from './List'
import ListAdd from './ListAdd'
import AppHeader from './AppHeader'

export default {
    components:{
        List,
        ListAdd,
        AppHeader
    },
    data() {
        return {
            todoList:[]
        }
    },
    computed:{
        countDone(){
            let count = 0;
            this.todoList.forEach(list=>{
                if(list.status === 'done' ) count++
            })
            return count
        }
    },
    methods:{
        listAdd(memo){
            this.todoList.push({
                memo:memo,
                status:'created'
            })
        },
        statusControl(index,status){
            this.todoList[index].status = status
        },
        listDelete(index) {
            this.todoList.splice(index,1)
        },
        listEdit(memo,index){
            this.todoList[index].memo = memo
        }
    }
}

// export default {
//     components:{
//         List,
//         ListAdd,
//         AppHeader
//     },
//     data(){
//         return{
//             todoList:[],
//             toDay:''
//         }
//     },
//     computed:{
//         // setDate(){
//         //     let today = new Date();
//         //     let mm = today.getMonth() + 1;
//         //     let dd = today.getDate();
//         //     let yyyy = today.getFullYear();
//         //     let week = ['일','월','화','수','목','금','토'];
//         //     let weekName = week[today.getDay()];
//         //     let hours = today.getHours();
//         //     let minutes = today.getMinutes();
//         //     let seconds = today.getSeconds();
//         //     return yyyy + '년 ' + mm + '월 ' + dd + '일 ' + weekName + '요일' + hours + '시' + minutes + '분' + seconds + '초'
            
//         // }
//     },
//     methods:{
//         listAdd(memo,indexNum){
//             let ampm = new Date().getHours() < 12 ? 'am' : 'pm'
//             let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
//             let mm = new Date().getMinutes().toString()
//             let ss = new Date().getSeconds().toString()
            
//             let nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss} `
//             this.todoList.push({memo:memo,status:'created',mode:'add',display:'block',time:nowTime,star:'none',indexNum:indexNum})
//         },
//         statusControl(index,status){
//             this.todoList[index].status = status
//         },
//         listDelete(index){
//             this.todoList.splice(index,1)
//         },
//         listEdit(memo,index,mode,display){
//             this.todoList[index].memo = memo
//             this.todoList[index].mode = mode
            
//             //todolist안에 있는 diplay 전체를 block으로 바꿔줌
//             for(let i = 0; i < this.todoList.length; i++){
//                 this.todoList[i].display = display
//             }

            
//             let ampm = new Date().getHours() < 12 ? 'am' : 'pm'
//             let hh = (new Date().getHours().toString() % 12) ? new Date().getHours().toString() % 12 : 12
//             let mm = new Date().getMinutes().toString()
//             let ss = new Date().getSeconds().toString()

//             let nowTime = ` ${ampm} ${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}:${ss < 10 ? `0${ss}` : ss} `

//             this.todoList[index].time = nowTime

//         },
//         realTime(){
//             setInterval(() => {
//                 let today = new Date();
//                 let mm = today.getMonth() + 1;
//                 let dd = today.getDate();
//                 let week = ['일','월','화','수','목','금','토'];
//                 let weekName = week[today.getDay()];
//                 let hours = today.getHours();
//                 let minutes = today.getMinutes();
//                 let seconds = today.getSeconds();

//                 let toDate = `${mm}월 ${dd}일 ${weekName}요일 ` + `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`
//                 this.toDay = toDate

//             }, 1000);
//         },
//     }
// }
</script>

<style>

</style>