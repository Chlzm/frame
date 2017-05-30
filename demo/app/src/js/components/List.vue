<template>
    <div>
        <span>{{inputValue}}</span>
        <button @click="removeFromCart2(4)">子组件点击</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    let delay = '';
    export default {
        props: {
              inputValue: Number
        },
        methods: {
            ...mapActions([
                'removeFromCart2'
            ])
        }
    }
</script>
