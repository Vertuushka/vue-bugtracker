<template>
    <div class="priority-label">
        <p class="priority-text">Medium</p>
    </div>
</template>

<style>
    .priority-label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        border-radius: 16px;
        background-color: var(--color-important);
    }

    .priority-text {
        color: #ffffff;
        font-weight: bold;
    }

</style>

<script>
    export default {
        name: "PriorityLabel"
    }
</script>