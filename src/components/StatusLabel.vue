<template>
    <div class="status-label">
        <p class="status-text description">{{ data }}</p>
    </div>
</template>

<style>
    .status-label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        border-radius: 4px;
        background-color: var(--separator);
    }

</style>

<script>
    export default {
        name: "StatusLabel",
        props: {
            data: {
                type: String,
                required: true
            }
        }
    }
</script>