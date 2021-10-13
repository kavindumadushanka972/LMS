<template>
    <div class="dashboard">
        <div class="row">
            <div class="col-lg-3 sidebar">
                <h2>{{ 'Hi, ' + fname}}</h2>
                <p>{{ user.email }}</p>
                <h4>{{ roleStr }}</h4>
            </div>
            <div class="col-lg-9 main-col">
                <h3>Your courses</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            user: Object
        }
    },
    async created() {
        const token = localStorage.getItem('auth')
            console.log(token)

        if (typeof token === 'undefined' || token === null) {
            this.$router.push('/')
        }
        const res = await fetch('http://localhost:5000/user/infor', {
            method: "GET",
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            Authorization: token
            },
            credentials: 'include',
        })

        this.user = await res.json()
    },
    computed: {
        fname() {
            return this.user.name.split(' ')[0]
        },
        roleStr() {
            const roles = ['Student', 'Teacher', 'Admin']
            return roles[this.user.role - 1]
        }
    }
}
</script>

<style scoped>
.dashboard {
    width: 100%;
    margin: 0 auto 0 auto;
    padding: 0;
}
.sidebar { 
    padding-top: 40px;

    background-color: rgb(238, 192, 192);
}
</style>