<template>
    <div
        v-if="status != 'end'"
        class="play"
    >
        <h1 v-if="status == 'start'">Let's get the game started</h1>

        <section
            v-if="status == 'start'"
            style="max-width: 400px; margin: auto;"
        >
            <div>
                For each Spanish word write the corresponding English translation
                and then press correct in order to check your answers
            </div>
            <button class="btn" @click="status = 'pending'">Start the game</button>
        </section>

        <lives-counter></lives-counter>

        <div
            class="p-10"
            style="position: absolute; top: 0; left: 0;"
        >
            <p>Answer streak <strong>{{ streak }}</strong></p>
            <p>Total right answers <strong>{{ rightAnswers }}</strong></p>
        </div>
        
        <question-item
            v-if="status == 'pending'"
            key="question"
            :question="question"
            :options="options"
            @select="addAnswer"
        />

        <question-result
            v-if="status == 'review'"
            key="result"
            :status="questionStatus"
            :streak="streak"
            @next="generateNewQuestion"
        />
    </div>
    <div v-else>
        Game is over
    </div>
</template>

<script>
import QuestionItem from "@/components/QuestionItem"
import QuestionResult from "@/components/QuestionResult"
import LivesCounter from "@/components/LivesCounter"

export default {
    name: "Play",

    data() {
        return {
            id: null,
            status: "start",
        }
    },

    computed: {
        words() {
            return this.$store.state.words
        },

        question() {
            return this.words.find(q => q.id === this.id)
        },

        options() {
            if (!this.id) return []
            return this.$store.getters.getOptions(this.id)
        },

        rightAnswers() {
            return this.$store.getters.rightAnswers
        },

        streak() {
            return this.$store.state.streak
        },

        lives() {
            return this.$store.state.lives
        },

        questionStatus() {
            const answer = this.$store.state.answers[this.id]
            if (this.id == answer) {
                return "right"
            }
            return "wrong"
        },
    },

    mounted() {
        this.id = this.getRandomId()
    },

    methods: {
        addAnswer(answerId) {
            this.$store.dispatch("addAnswer", {
                questionId: this.id,
                answerId,
            })
            if (this.lives) {
                this.status = "review"
            } else {
                this.status = "end"
            }
        },

        generateNewQuestion() {
            this.id = this.getRandomId()
            this.status = "pending"
        },

        getRandomId() {
            const missingWords = this.words.filter(w => {
                return !this.$store.state.answers[w.id] || this.$store.state.answers[w.id] !== w.id
            })
            const length = missingWords.length
            console.log(`Quedan ${length} palabras por responder`)
            const randIndex = Math.floor(Math.random() * (length + 1))
            return missingWords[randIndex].id
        },
    },

    components: {
        QuestionItem,
        QuestionResult,
        LivesCounter,
    }
}
</script>
