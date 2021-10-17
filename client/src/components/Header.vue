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
                <router-link to="/" class="nav-link">HOME</router-link>
            </li>
           
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                COURSES
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <!-- <router-link class="dropdown-item" :to="{name: 'Courses', query: {category: 'maths', page: 1}}">Maths</router-link>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {category: 'programming', page: 1}}">Programming</router-link>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {category: 'multimedia', page: 1}}">Multimedia</router-link>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {category: 'english', page: 1}}">English</router-link>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {category: 'other', page: 1}}">Other</router-link> -->

                <router-link :key="category._id" v-for="category in categories" class="dropdown-item" :to="{name: 'Courses', query: {category: category.name, page: 1}}">{{ category.name }}</router-link>


                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" :to="{name: 'Courses', query: {page: 1}}">All</router-link>
                </div>
            </li>
            <li class="nav-item">
                <a v-if="user" class="nav-link" @click="logout" >LOGOUT</a>
              
            </li>
                    <li><router-link v-if="!user" class="nav-link" to="/login">LOGIN</router-link></li>
                    <li><router-link v-if="!user" class="nav-link" to="/register">SIGNUP</router-link></li>
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
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
import UserService from '../services/UserService'

export default {
    name: 'Header',
    data() {
        return {
            // loggedin: false
        }
    },
    async mounted() {
        await this.loadUser()
        this.loggedin = this.user != null
        await this.fetchCategories()
    },
    methods: {
        async logout() {
            //  try {
            //     const res = await fetch('http://localhost:5000/user/logout', {
            //         method: "POST",
            //         mode: 'cors',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': 'Bearer ' + localStorage.getItem('auth')},
            //         credentials: 'include',
            //         body: ''
            //     })
            //     const data = await res.json()
            //     console.log(data, res.status)

            //     if (res.status !== 200) {
            //         return
            //     }
            
            //     console.log('logint out: ' + this.user)
            
            //     // this.$store.commit('setAuth', data)
            //     localStorage.removeItem('auth')
            //     this.$store.commit('setUser', null)
            //     this.$loggedin = false
            //     this.$router.push('/')

            // } catch(err) {
            //     console.log(err)
            // }
            UserService.logout().then(() => {
                this.$store.commit('setUser', null)
                // this.$loggedin = false
                this.$router.push('/')
            })

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