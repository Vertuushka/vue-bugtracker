<template>
    <div class="priority-label" :class="`label-${data}`">
        <p class="priority-text">{{ data }}</p>
    </div>
</template>

<style>
    .priority-label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        border-radius: 16px;
    }

    .priority-text {
        color: #ffffff;
        font-weight: bold;
    }

</style>

<script>
    export default {
        name: "PriorityLabel",
        props: {
            data: {
                type: String,
                required: true
            }
        }
    }
</script>