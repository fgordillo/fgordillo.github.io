<template>
    <div>
        <span>{{ question.spanish }}</span>
        <input
            class="ml-20"
            :class="correctionClass"
            type="text"
            :id="question.id"
            :value="value"
            :disabled="disabled"
            @input="input"
        >
        <span
            v-if="isRightAnswer"
            class="text-success"
        >
            ✔️
        </span>
        <span
            v-if="disabled && !isRightAnswer"
            class="text-danger"
        >
            ❌
        </span>
    </div>
</template>

<script>
export default {
    props: {
        question: Object,
        value: String,
        disabled: Boolean,
    },

    computed: {
        isRightAnswer() {
            if (!this.disabled) return null
            return this.question.english == this.value
        },

        correctionClass() {
            if (!this.disabled) return null
            return this.isRightAnswer ? "border-success" : "border-danger"
        },
    },

    methods: {
        input(event) {
            this.$emit("input", event.target.value)
        },
    }
}
</script>

<style scoped>
.ml-20 {
    margin-left: 20px;
}
.border-success {
    border: 2px solid greenyellow;
}
.border-danger {
    border: 2px solid red;
}
.text-success {
    color: greenyellow;
}
.text-danger {
    color: red;
}
</style>