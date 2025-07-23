<template>
    <div class="status-label">
        <p class="status-text description">Open</p>
    </div>
</template>

<style>
    .status-label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 12px;
        border-radius: 16px;
        background-color: var(--separator);
    }

</style>

<script>
    export default {
        name: "StatusLabel"
    }
</script>