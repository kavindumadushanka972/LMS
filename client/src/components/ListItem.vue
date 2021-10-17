<template>
    <div class="col-12">
    <div :class="['list-item', 'row', selected? 'selected':'']" >
        <p @click="$emit('handle_click')" class="col-10 truncated-text">{{ `${index}. ${name}` }}</p>
         <div  @click="$emit('handle_edit')" class="edit-icon col-1 ">
            <i  v-if="showEditButton" class="far fa-edit"></i>
        </div>
        <div v-if="showDeleteButton" @click="$emit('handle_delete')" class="edit-icon col-1">
            <i  class="far fa-trash-alt"></i>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        name: '',
        index: 0,
        showDeleteButton: false,
        showEditButton: false,
        selected: false
    }
}
</script>

<style scoped>
.list-item {
    position: relative;
    border: 3px solid #e5e5e5;
    /* background-color: #e5e5e5; */
    padding: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    /* height: 4rem; */
}
.list-item p {
    text-align: left;
    padding: 0.6rem 5px;
    margin: 0;
}
.list-item:hover {
    border-color: #A0E7E5;
}
.edit-icon {
    font-size: 1rem;
    padding: 0.6rem 5px;
    margin: 0;
} 
.edit-icon:hover {
    color: red;
}
.selected{
    border-color: blue;
}
selected:hover {
    border-color: blue;
}
</style>