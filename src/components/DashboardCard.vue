<template>
    <div class="card flex">
        <p class="card-header" :class="`color-${type}`">{{ value }}</p>
        <p class="card-description description">{{ label }}</p>
    </div>
</template>

<style>
    .card-header {
        font-size: 24px;
        font-weight: bold;
    }

</style>

<script>
    export default {
        name: "DashboardCard",
        props: {
            label: {
                type: String,
                required: true,
            },
            value: {
                type: Number,
                required: true,
            },
            type: {
                type: String,
                required: true,
            }
        },
    }
</script>