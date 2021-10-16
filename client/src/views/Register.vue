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
      <button class="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
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
    async submit() {
      // try {
      //   const res = await fetch('http://localhost:5000/user/register', {
      //       method: "POST",
      //       mode: 'cors',
      //       headers: {'Content-Type': 'application/json'},
      //       credentials: 'include',
      //       body: JSON.stringify({
      //         name: this.fname + ' ' + this.lname,
      //         email: this.email, 
      //         password: this.password,
      //         passwordConf: this.passwordConf,
      //         role: parseInt(this.role)
      //       })
      //   })
      //   const data = await res.json()
      //   console.log(data)

      //   if (res.status !== 200) {
      //     this.errorMsg = data.msg
      //     return
      //   }
      //   this.errorMsg = ''
      //   localStorage.auth = data
      //   this.$router.push('/')

      // } catch(err) {
      //   this.errorMsg = err
      // }
      UserService.register(this.userData)
      .then(() => this.$router.push('/'))
      .catch((err) => this.errorMsg = err)
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

}
.container {
  /* display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center; */
  align-items: center;
  /* -webkit-box-pack: center; */
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  /* background-color: #f5f5f5; */
  /* width: 50%; */
  border: 1px solid  #e6e3e3;
  background-color: white;
}


.row {
    text-align: left;
}

.form-signin {
  width: 100%;
  /* max-width: 330px; */
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
</style>