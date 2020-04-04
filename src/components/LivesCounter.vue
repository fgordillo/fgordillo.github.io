<template>
    <div
        class="text-danger p-10"
        style="position: absolute; top: 0; right: 0;"
    >
        <v-icon
            v-for="i in lives"
            :key="`heart-${i}`"
            class="mlsp-10"
            scale="2"
            name="heart"
        />
        <v-icon
            v-for="i in brokenLives"
            :key="`broken-heart-${i}`"
            class="mlsp-10"
            scale="2"
            name="heart-broken"
        />
    </div>
</template>

<script>
export default {
    computed: {
        lives() {
            return this.$store.state.lives
        },

        brokenLives() {
            return 5 - this.lives
        },
    }
}
</script>