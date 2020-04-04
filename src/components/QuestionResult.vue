<template>
    <div>
        <div>
            <h2
                :class="statusClass"
                class="flex-centered"
            >
                <v-icon
                    :name="statusIcon"
                    scale="2"
                    class="mlsp-10"
                />
                <span class="mlsp-10">{{ status }}</span>
            </h2>
        </div>

        <button
            class="btn"
            @click="$emit('next')"
        >
            Next
        </button>
    </div>
</template>

<script>
export default {
    props: {
        status: String,
    },

    computed: {
        statusClass() {
            switch (this.status) {
            case "right":
                return "text-success"
            case "wrong":
                return "text-danger"
            default:
                throw new Error(`Unexpected status ${this.status}`)
            }
        },

        statusIcon() {
            return this.status == "right" ? "thumbs-up" : "thumbs-down"
        }
    }
}
</script>