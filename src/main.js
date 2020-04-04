import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"

import Icon from "vue-awesome/components/Icon"
import "vue-awesome/icons/check"
import "vue-awesome/icons/times"

Vue.component("v-icon", Icon)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app")
