<template>
    <div class="course-search">
     <form class="form-control">
          <div class="form-group">
          <label for="selecteCategory">Category</label>
          <select v-model="category" class="form-control category select" aria-label="Seletect category">
            <option selected value="all">All</option>
            <option value="maths">Math</option>
            <option value="english">Programming</option>
            <option value="multimedia">Multimedia</option>
            <option value="programming">English</option>
            <option value="other">Other</option>
          </select>
        </div>
        </form>
    </div>
</template>

<style scoped>
.form-group {
    border: none;
}
</style>