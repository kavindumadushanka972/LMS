<template>
    <div class="reg-form row">
     <div class="container col-md-6" >
     <form class="form-signin" @submit.prevent="submit">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <h1 class="h3 mb-3 font-weight-normal">Singn Up for Free</h1>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName">First name</label>
          <input type="text" class="form-control" name="firstName" placeholder=""  v-model="userData.fname" required>
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName">Last name</label>
          <input type="text" class="form-control" name="lastName" placeholder="" v-model="userData.lname" required>
        </div>
      </div>

       <div class="row">
          <div class="col-md-12 mb-3">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control" name="firstName" placeholder="" v-model="userData.email" required>
          </div>
          
          <div class="col-md-12 mb-3">
            <label for="inputPasword">Pasword</label>
            <input type="password" name="password" class="form-control" v-model="userData.password" placeholder="" required>
            <label for="inputPasword">Pasword confirmation</label>
            <input type="password" name="passwordConf" class="form-control" v-model="userData.passwordConf" placeholder="" required>            
          </div>
      </div>

      <div class="row">
        <div class="form-group col-12 select-role">
          <label for="selecteRole">What are you?</label>
          <select v-model="userData.role" class="form-control" aria-label="Seletect role">
            <option selected value="1">Student</option>
            <option value="2">Teacher</option>
          </select>
        </div>
      </div>    
      <p v-if="errorMsg != ''">{{ errorMsg }}</p>
      <button class="btn btn-lg btn-dark btn-block" type="submit">Sign up</button>
    </form>
     </div>
     </div>
</template>

<script>
import UserService from '../services/UserService'
export default {
  name: 'Register',
  data() {
    return {
      userData: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        passwordConf: '',
        role: '1',
      },
      errorMsg: ''
    }
  },
  methods: {
    async submit() {  // redirect to dashboard
      try {
        await  UserService.register(this.userData)
        this.$router.push('/dashboard')
      } catch(err) {
        this.errorMsg = err
      }
    }
  }
}
</script>

<style scoped>
.reg-form {
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 50px;
  background-color: #A0E7E5;
  position: relative;
  top: 0;
  padding-bottom: 50px;
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
.row {
    text-align: left;
}
.form-signin {
  width: 100%;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
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
.select-role {
  margin-bottom: 100px;
}
label {
  font-weight: 600;
}
</style>