<template>
    <div :class="['toast', hide? 'hidden':'']">
        <p class="truncated-text">{{ msg }}</p>
    </div>
</template>

<script>
import EventBus from '../common/EventBus'

export default {
    name: 'Toast',
    data() {
        return {
            hide: true,
            msg: ''
        }
    },
    mounted() {
        EventBus.on('toast', (data) => {
            this.msg = data
            this.hide = false
            setTimeout(() => {
                this.hide = true
            }, 4000)
        })
    },
    methods: {

    }
}
</script>

<style scoped>
.toast {
    min-width: 50%;
    width: fit-content;
    height: 2rem;
    background-color: black;
    position: fixed;
    z-index: 5;
    top: 10px;
    left: 50%;
    margin-left: -25%;
    border-left: 4px solid red;
    text-align: left;
    transition: opacity 2s;
    overflow: hidden;
}
p {
    color: white;
    margin: 0.3rem;
}
.hidden {
    opacity: 0;
}
</style>