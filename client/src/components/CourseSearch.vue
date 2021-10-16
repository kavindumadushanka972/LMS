<template>
    <div class="course-search">
     <form class="form-control" @submit.prevent="$emit('do_search', search)">
          <div class="row">
            <div class="col-lg-3">
              <input v-model="search.keyword" class="form-control form-control-sm" placeholder="Enter keyword">
            </div>
            <!-- <div class="col-lg-1">
              <label for="selecteCategory">Category</label>
            </div> -->
            <div class="col-lg-2 col-sm-6">
              <select v-model="search.category" class="form-control form-control-sm category-select" aria-label="Seletect category">
                <option selected value="" >Any category</option>
                <option value="maths">Math</option>
                <option value="programming">Programming</option>
                <option value="multimedia">Multimedia</option>
                <option value="english">English</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-lg-2 col-sm-6">
              <select v-model="search.sort" class="form-control form-control-sm sort-select" aria-label="Seletect sort">
                <option selected value="-createdAt">Latest first</option>
                <option value="-enrolled_number">Trending first</option>
                <option selected value="createdAt">Oldest first</option>
              </select>
            </div>
            <div class="col-lg-1">
                <button class="btn btn-dark btn-sm">Search</button>
            </div>
        </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'CourseSelect',
  data() {
    return {
      search: {
        keyword: '',
        category: '',
        sort: '-createdAt'
      }
    }
  },
  methods: {
  
  }
}
</script>

<style scoped>
div {
  margin-bottom: 10px;
}
.form-group {
    border: none;
}
.course-search {
  width: 95%;
  padding: 0;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 5px;
  position: relative;
  top: 0;

}
.container {
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
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
.category-select {
  width: 100%;
}
form {
  border: none;
}

</style>