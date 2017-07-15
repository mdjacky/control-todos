<template>

  <div class="LoginContainer jumbotron">
    <div class="form-container">
      <legend>LOGIN TO VIEW OR ADD TO-DOS</legend>
      <form class="form-horizontal" v-on:submit.prevent="loginSubmit()">
        <fieldset>
          <div class="form-group" v-bind:class="{ 'has-error': isFailure }">
            <label for="UserName">Username</label>
            <input class="form-control" id="UserName" 
              placeholder="Enter your username" type="text"
              v-model.trim="username">
            <transition name="fade">
              <span v-if="isFailure"> The username is not existed. </span>
            </transition>
          </div>
          <button class="btn btn-primary pull-right" type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import auth from '@/auth/auth.js'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      isFailure: false
    }
  },
  watch: {
    username: function () {
      this.isFailure = false
    }
  },
  methods: {
    loginSubmit () {
      auth.login(this, this.username).catch(() => {
        this.isFailure = true
      })
    },
    clearError () {
      this.isFailure = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
  .jumbotron.LoginContainer {
    width: 550px;
    margin: 100px auto 0 auto;
    padding-left: 75px;
    .form-container {
      width: 400px !important;
      legend {
        font-size: 24px;
        text-align: center;
      }
      .form-horizontal{
        margin-top: 40px;
      }
      
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
