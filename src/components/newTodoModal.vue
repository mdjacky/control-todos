<template>
  <transition name="transform-newToDo" tag="div">
    <div class="transform-newToDo-item jumbotron newToDoContainer">
      <h5>To-Do..</h5>
      <form v-on:submit.prevent="newTodoSubmit()">
        <div class="form-group">
          <input class="form-control" placeholder="What needs to be done?" type="text" v-model="todo.title">
        </div>
        <div class="form-group button-group">
          <button class="btn btn-default" type="reset" v-on:click="cancelNewTodo()">Cancel</button>
          <button class="btn btn-primary" type="submit">Create</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'newTodoModal',
  data () {
    return {
      todo: {
        title: ''
      }
    }
  },
  methods: {
    validator () {
      return !!this.todo.title
    },
    newTodoSubmit () {
      if (this.validator()) {
        this.$emit('AddNewToDo', this.todo)
        this.todo.title = ''
      }
    },
    cancelNewTodo () {
      this.todo.title = ''
      this.$emit('CancelNewToDo')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
  .newToDoContainer.jumbotron {
    width: 500px;
    height: 250px;
    margin: 20px auto 0 auto;
    padding-left:  20px;
    padding-right: 20px;
    .form-group.button-group {
      margin-top: 50px;
      padding-left: 100px;
      button {
        margin-left: 15px;
        margin-right: 15px;
      }
    }
  }  
  .transform-newToDo-enter-active  {
    transition: all .5s ease;
  }
  .transform-newToDo-leave-active {
    transition: all .5s ease;
  }
  .transform-newToDo-enter, .transform-newToDo-leave-to
  /* .transform-newToDo-leave-active for <2.1.8 */ {
    transform: translateX(100px);
    opacity: 0;
  }
</style>
