import Vue from "vue"
import Vuex from "vuex"
import Papa from "papaparse"

Vue.use(Vuex)

const url = "https://github.com/fgordillo/vue-words-game/blob/master/src/assets/spanish.csv"

export default new Vuex.Store({
    state: {
        words: [],
    },

    mutations: {
        setWords(state, words) {
            Vue.set(state, "words", words)
        },
    },
    actions: {
        init({ commit }) {
            Papa.parse(url, {
                download: true,
                delimiter: ",",
                header: true,
                quotes: false,
                complete(results, file) {
                    console.log("Parsing complete", {results, file})
                    console.log(results.data)
                    commit("setWords", results.data)
                }
            })
        }
    },
    modules: {
    },
})
