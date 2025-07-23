<template>
    <div class="drop-down width-100">
        <div class="drop-down-control flex">
            <p class="dropdown-label">Dropdown label</p>
            <img src="../assets/arrow_down.svg" alt="">
        </div>
        <div class="drop-down-menu flex">
            <p class="drop-down-item">1</p>
            <p class="drop-down-item">1</p>
            <p class="drop-down-item">1</p>
            <p class="drop-down-item">1</p>
        </div>
    </div>
</template>

<style>
    .drop-down {
        display: flex;
        position: relative;
        min-width: fit-content;
    }
    .drop-down-control {
        width: 100%;
        padding: 12px 16px;
        justify-content: space-between;
        border-radius: 8px;
        border: 1px solid var(--separator);
        cursor: pointer;
    }
    .drop-down:hover {
        border-radius: 8px;
        background-color: var(--separator);
    }

    .drop-down-menu {
        width: 100%;
        flex-direction: column;
        position: absolute;
        top: 100%;
        border-radius: 8px;
        border: 1px solid var(--separator);
        display: none;
    }

    .drop-down-item {
        padding: 8px 12px;
        cursor: pointer;
    }

    .drop-down-item:hover {
        background-color: var(--separator);
    }

    /* .dropdown-label {
        white-space: nowrap;
    } */

</style>

<script>
    export default {
        name: "DopDown"
    }
</script>