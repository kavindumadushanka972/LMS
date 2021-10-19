<template>
    <footer>
        <router-link to="/about">About</router-link>
        <router-link to="/home">Home</router-link>

        <router-link to="/contact">Contact</router-link>
      

        <router-link to="/">Support</router-link>
        <div class="social-icon-container">
            <i class="social-icon fab fa-facebook"></i>
            <i class="social-icon fab fa-twitter"></i>
            <i class="social-icon fas fa-envelope"></i>
            <i class="social-icon fab fa-instagram"></i>
        </div>
        <p class="copyright">&copy; Copyright 2021 iLearn</p>
    </footer>
</template>

<style scoped>
footer {
    background-color: #e5e5e5;
    height: 10rem;
    padding-top: 10px;
    /* position: absolute;
    bottom: 0; */
    width: 100%;
}
a {
    margin-left: 1rem;
    margin-right: 1rem;
}
a:hover {
    /* text-decoration: underline; */
}
.copyright {
    color: gray;
   margin-top: 3rem;
   
}
.social-icon {
    margin: 10px;
    margin-top: 30px;
}
.social-icon:hover {
    color: blue;
}
</style>