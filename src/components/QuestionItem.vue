<template>
    <div>
        <h2>{{ question.spanish }}</h2>
        <button
            v-for="option in options"
            :key="option.id"
            @click="select(option.id)"
            class="btn mlsp-20"
        >
            {{ option.english }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
        options: Array,
    },

    methods: {
        select(id) {
            this.$emit("select", id)
        },
    },
}
</script>