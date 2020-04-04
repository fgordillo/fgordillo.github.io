<template>
    <div class="play">
        <h1>Let's get the game started</h1>

        <section>
            For each Spanish word write the corresponding English translation
            and then press correct in order to check your answers
        </section>
        
        <question-item
            v-for="question of questions"
            :key="question.id"
            :question="question"
            :disabled="disabled"
            :value="answers[question.id]"
            @input="v => input({id: question.id, value: v})"
        />

        <button
            v-if="!disabled"
            @click="disabled = true"
        >
            Correct my answers
        </button>

        <button
            v-if="disabled"
            @click="disabled = false"
        >
            Restart
        </button>
    </div>
</template>

<script>
import Vue from "vue"
import QuestionItem from "@/components/QuestionItem"

export default {
    name: "Play",

    data() {
        return {
            questions: [
                { id: 1, english: "fox", spanish: "zorro", },
            ],
            answers: {},
            disabled: false,
        }
    },

    methods: {
        input({id, value}) {
            Vue.set(this.answers, id, value)
        }
    },

    components: {
        QuestionItem,
    }
}
</script>