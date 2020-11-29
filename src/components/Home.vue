<template>
    <div class="home">
        <!-- <p>전체할일: {{ todoList.length }} / 완료된 할일: {{ countDone }} / 남은할일: {{ todoList.length - countDone }}</p> -->
        <AppHeader
        :todoList="todoList"
        ></AppHeader>
        <ListAdd
            @listAdd="listAdd"
            @listEdit="listEdit"
        ></ListAdd>
        <List 
        :todoList="todoList"
        :editMode="editMode"
        @statusControl="statusControl"
        @editBtnControl="editBtnControl"
        @listDelete="listDelete"
        @listClear="listClear"
        ></List>
    </div>
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
            todoList:[],
            editMode:false
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
                status:'created',
                mode:'add'
            })
            
            console.log(this.todoList);
        },
        statusControl(index,status){
            console.log('위치는 home',index,status);

            this.todoList[index].status = status
            console.log('잘됐는지 확인',this.todoList[index].status);
        },
        listDelete(index) {
            this.todoList.splice(index,1)
        },
        listEdit(memo,index){
            this.todoList[index].memo = memo;
            this.todoList[index].mode = 'add'
            this.editMode = false
        },
        editBtnControl(mode) {
            this.editMode = mode
        },
        listClear() {
            this.todoList = [];
        }
    }
}
</script>

<style>

</style>