<template>
    <div class="login-form row">
     <div class="container col-lg-3 col-md-5" >
     <form class="form-signin" @submit.prevent="submit">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
     
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus>
      
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>  
      
      <div class="submit-section">
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <button class="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
      </div>
    </form>
     </div>
    </div>
</template>

<script>
import UserService from '../services/UserService'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMsg: ''  // error to display 
    }
  },
  methods: {
    async submit() {  // redirect to dashboard
      try {
        await UserService.login(this.email, this.password)
        this.$router.push('/dashboard')
      } catch(err) {
        console.log('login error')
        this.errorMsg = err
      }    
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #A0E7E5;
  position: relative;
  top: 0;
}
.container {
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  border: 1px solid  #e6e3e3;
  background-color: white;
  border-radius: 10px;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.submit-section {
  margin-top: 30px;
}
</style>