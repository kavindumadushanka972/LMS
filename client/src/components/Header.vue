<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand font-weight-bold" to="/">i<span class="ilearn-l">L</span>earn</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
           
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Courses
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Tech & programming</a>
                <a class="dropdown-item" href="#">Math</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/courses">All</a>
                </div>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            </ul>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
        </div>
        </nav>
    </header>
</template>

<script>

export default {
    name: 'Header'
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: light;
  color: #2c3e50;
  text-decoration: none;
}



#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-toggler.collapsed{
    border: none;
}

.navbar-toggler {
    border: none;
}


</style>