<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-brand" id="logo-container">
            <img src="./assets/control-logo.svg">
          </div>
          <span class="navbar-brand">To-Do Application</span>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a id="user-welcome" v-bind:class="{'whiteText':userWelcome}"> {{userWelcome || signInMsg}} </a></li>
          <li class="logout-btn"><a v-if="userWelcome" class="logout-link" @click="logout"> Logout </a></li>
        </ul>
      </div>
    </nav>   
    <router-view @userSignIn="showWelcome"></router-view>
  </div>
</template>

<script>
import auth from './auth/auth.js'

export default {
  name: 'app',
  data () {
    return {
      signInMsg: 'Please Sign In',
      userWelcome: ''
    }
  },
  methods: {
    showWelcome () {
      this.userWelcome = `Welcome, ${localStorage.getItem('userName')}`
    },
    logout () {
      this.userWelcome = ''
      auth.logout(this)
    }
  }
}
</script>

<style lang="scss">
  @import './assets/css/bootstrap.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    nav {
      background-color: #0b6fc1;
      
    }
    span.navbar-brand {
      color: white;
      font-weight: bold;
    }
  }
  
  #logo-container{
    img {
      position: relative;
      top: -10px;
      height: 40px;
    }
  }

  #user-welcome {
    &:hover {
      color: white;
    }
  }

  #user-welcome.whiteText {
    color: white;
  }

  li.logout-btn{
    cursor: pointer;
    background: #0d7dd9;
    &:hover {
      background: #2696f2;
    }
    a.logout-link {
      color: black;
      &:hover{
        color: white;
      }
    }
  }
</style>
