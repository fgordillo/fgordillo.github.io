import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function shuffle(array) {
    let top = array.length
    while (top--) {
        let current = Math.floor(Math.random() * (top + 1))
        let tmp = array[current]
        array[current] = array[top]
        array[top] = tmp
    }
    return array
}

import words from "@/assets/words.json"
const INITIAL_LIVES = 5

export default new Vuex.Store({
    state: {
        words: [],
        answers: {},
        streak: 0,
        lives: INITIAL_LIVES,
    },

    getters: {
        getOptions: (state) => (questionId) => {
            const rightOption = state.words.find(w => w.id == questionId)
            const shuffledWords = shuffle(state.words)
            const options = shuffledWords.slice(0, 2)
            options[2] = rightOption
            return shuffle(options)
        },

        rightAnswers(state) {
            return Object.keys(state.answers).filter(qId => {
                return qId == state.answers[qId]
            }).length
        },
    },

    mutations: {
        setWords(state, words) {
            Vue.set(state, "words", words)
        },

        setAnswer(state, { questionId, answerId }) {
            Vue.set(state.answers, questionId, answerId)
        },

        resetStreak(state) {
            state.streak = 0
        },

        incrementStreak(state) {
            state.streak++
        },

        resetLives(state) {
            state.lives = INITIAL_LIVES
        },

        loseLive(state) {
            state.lives--
        },
    },

    actions: {
        init({ state, commit }) {
            if (state.words.length) return
            commit("setWords", words)
        },

        addAnswer({ commit }, { questionId, answerId }) {
            if (questionId == answerId) {
                commit("incrementStreak")
            } else {
                commit("resetStreak")
                commit("loseLive")
            }
            commit("setAnswer", { questionId, answerId })
        }
    },
    modules: {
    },
})
