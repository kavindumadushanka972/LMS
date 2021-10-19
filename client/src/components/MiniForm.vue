<template>
    <div class="col-12">
        <form @submit.prevent="$emit('on_submit', formData)">
            <h3 class="h3 mb-3 font-weight-normal">{{ title }}</h3>
            
            <input  :key="item" v-for="item in items" type="text" id="inputEmail" 
                    class="form-control form-control-sm" :placeholder="item" required autocomplete="off"
                    v-model="formData[item]">
            
            <p v-if="errorMsg">{{ errorMsg }}</p>
            <button class="btn btn-lg btn-dark btn-block btn-sm" type="submit">Save</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'MiniForm',
    props: {
        items: Array,
        title: String
    },
    data() {
        return {
            formData: {},
            errorMsg: ''
        }
    }
}
</script>

<style scoped>
form {
  width: 100%;
  padding: 0;
  margin: 0;
  padding-top: 50px;
  padding-bottom: 50px;
  position: relative;
  top: 0;
}
.form-control {
    margin-bottom: 20px;
}
</style>