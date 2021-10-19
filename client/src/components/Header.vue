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
                <router-link :key="category._id" v-for="category in categories" class="dropdown-item" :to="{name: 'Courses', query: {category: category.name, page: 1}}">{{ category.name }}</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {page: 1}}">All</router-link>
                </div>
            </li>
            <li class="nav-item">
                <a v-if="user" class="nav-link" @click="logout" >Log out</a>   
            </li>
                <li><router-link v-if="!user" class="nav-link" to="/login">Log in</router-link></li>
                <li><router-link v-if="!user" class="nav-link" to="/register">Sign up</router-link></li>
            </ul>
         
        </div>
        </nav>
    </header>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
import EventBus from '../common/EventBus'
import UserService from '../services/UserService'

export default {
    name: 'Header',
    async mounted() {
        await this.loadUser()
        this.loggedin = this.user != null
        await this.fetchCategories()
    },
    methods: {
        async logout() {
            EventBus.trigger('logout')
        },
        ...mapActions(['loadUser', 'fetchCategories']) 
    },
    computed: {
        // ...mapGetters(['authenticated']),
        ...mapState(['user', 'categories'])
    }
    
    
}
</script>

<style scoped>
#nav {
  padding: 30px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.navbar-nav a {
  font-size: 0.9rem;
}

#nav a {
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
a {
    cursor: pointer;
}


</style>