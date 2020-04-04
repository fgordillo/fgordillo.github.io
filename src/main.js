import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"

import Icon from "vue-awesome/components/Icon"
import "vue-awesome/icons/check"
import "vue-awesome/icons/heart"
import "vue-awesome/icons/heart-broken"
import "vue-awesome/icons/thumbs-down"
import "vue-awesome/icons/thumbs-up"
import "vue-awesome/icons/times"

Vue.component("v-icon", Icon)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app")
