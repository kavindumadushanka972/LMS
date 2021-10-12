<template>
     <div class="container">
     <form class="form-signin">
      <h1>i<span class="ilearn-l">L</span>earn</h1>
      <!-- <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
      <h1 class="h3 mb-3 font-weight-normal">Singn Up for Free</h1>
      <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input type="text" class="form-control" name="firstName" placeholder="" value="" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" name="lastName" placeholder="" value="" required>
              </div>
      </div>

       <div class="row">
              <div class="col-md-12 mb-3">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" name="firstName" placeholder="" value="" required>
              </div>
              <div class="col-md-12 mb-3">
                <label for="inputPasword">Pasword</label>
                <input type="password" name="password" class="form-control" placeholder="" required>
              </div>
      </div>

      <!-- <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required> -->
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-dark btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021</p>
    </form>
     </div>
</template>

<style scoped>

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
  margin-top: 40px;
  padding-bottom: 40px;
  /* background-color: #f5f5f5; */
  width: 90%;
  border: 1px solid  #e6e3e3;
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
</style>