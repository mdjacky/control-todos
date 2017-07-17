<template>
  <div class="TodoContainer">
    <div class="addNewToDoContainer">
      <button class="btn btn-default todo-btn" id="btn-closeNewToDo" v-if="displayNewTodo" v-on:click="closeNewTodo">Cancel</button>
      <new-todo-modal v-if="displayNewTodo" ref="newToDoModal" @CancelNewToDo="closeNewTodo" @AddNewToDo="addToDo($event.title)"></new-todo-modal>
      <button class="btn btn-default todo-btn" id="btn-openNewToDo" v-else v-on:click="openNewTodo">Add To-do</button>
    </div>
    <hr>
    <div class="ToDoList">
      <div class="list-container col-md-5">
          <h3>To-Dos</h3>
          <transition-group class="checkbox-group" name="transform-todoList" tag="p">
            <li class="transform-todoList-item uncompleted checkbox" v-for="(todo, index) in todoList" v-bind:key=todo.id>
              <label v-bind:id="'todoTaskLabel-'+index">
                <input type="checkbox" v-bind:id="'todoTaskInput-'+index" v-model="todo.completed" @click.prevent="completeToDo(index)"> {{todo.title}}
              </label>
            </li>
          </transition-group>
      </div>
      <div class="list-container col-md-6">
          <h3>Completed</h3>
          <transition-group class="checkbox-group" name="transform-todoList" tag="p">
            <li class="transform-todoList-item checkbox completedList" v-for="(complete, index) in completeList" v-bind:key=complete.id>
              <label v-bind:id="'completedTaskLabel-'+index">
                <input type="checkbox" v-bind:id="'completedTaskInput-'+index" v-model="complete.completed" @click.prevent="moveToDo(index)"> {{complete.title}}
              </label>
            </li>
          </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import newTodoModal from '@/components/newTodoModal'
export default {
  name: 'Todo',
  components: {
    newTodoModal
  },
  data () {
    return {
      userId: '',
      todoList: [],
      completeList: [],
      displayNewTodo: false,
      maximumID: 0
    }
  },
  created () {
    this.$emit('userSignIn')
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.userId = Number(localStorage.getItem('userId'))
      this.$http.get('https://jsonplaceholder.typicode.com/todos').then(response => {
        let todoList = response.body
        for (let todo of todoList) {
          if (todo.userId === this.userId) {
            if (todo.completed) {
              this.completeList.push(todo)
            } else {
              this.todoList.push(todo)
            }
          }
          this.maximumID = todo.id > this.maximumID ? todo.id : this.maximumID
        }
      }, err => {
        // error callback
        console.log('Server Error', err)
      })
    },
    openNewTodo () {
      this.displayNewTodo = true
    },
    closeNewTodo () {
      this.displayNewTodo = false
    },
    addToDo (val) {
      this.todoList.unshift({
        title: val,
        completed: false,
        id: this.maximumID++,
        userId: this.userId
      })
    },
    completeToDo (index) {
      this.todoList[index].completed = true
      this.completeList.unshift(this.todoList[index])
      this.todoList.splice(index, 1)
    },
    moveToDo (index) {
      this.completeList[index].completed = false
      this.todoList.unshift(this.completeList[index])
      this.completeList.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
  div.addNewToDoContainer {
    position: relative;
    padding-top: 10px;
    min-height: 40px;
    .todo-btn{
      margin-right: 30px;
      right: 30px;
      top: 10px;
      position: absolute;
    }
  }
  .ToDoList{
    padding-left: 40px;
    padding-right: 40px;
    .list-container{
      padding-left: 20px;
      .checkbox-group {
        padding-left: 40px;
      }
      .uncompleted{
        input[type="checkbox"]:focus:after{
          border-color: #666666;
        }
      }
    }
  }
  .transform-todoList-item{
    transition: all 0.5s;
    margin-right: 10px;
  }
  .transform-todoList-enter{
    transition: all .8s;
    transform: translateY(-10px);
  }
  .transform-todoList-leave-to
  /* .transform-todoList-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateX(60px);
  }
</style>
