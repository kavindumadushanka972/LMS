<template>
    <div class="login-form row">
     <div class="container col-md-4" >
     <form class="form-signin" @submit.prevent="submit">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <!-- <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <button class="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
      <!-- <p class="mt-5 mb-3 text-muted">&copy; 2021</p> -->
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
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      // try {
      //   const res = await fetch('http://localhost:5000/user/login', {
      //     method: "POST",
      //     mode: 'cors',
      //     headers: {'Content-Type': 'application/json'},
      //     credentials: 'include',
      //     body: JSON.stringify({email: this.email, password: this.password})
      //   })
      //   const data = await res.json()
      //   console.log(data)

      //   if (res.status !== 200) {
      //     this.incorrectPassword = true
      //     this.errorMsg = data.msg
      //     return
      //   }
       
       
      //   // this.$store.commit('setAuth', data)
      //   localStorage.auth = data
      //   this.$router.push('/dashboard')

      // } catch(err) {
      //    this.incorrectPassword = true
      //   this.errorMsg = err
      // }

      await UserService.login(this.email, this.password)
      .then(() => this.$router.push('/dashboard'))
      .catch((err) => this.errorMsg = err)

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


.form-signin {
  width: 100%;
  max-width: 330px;
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
</style>