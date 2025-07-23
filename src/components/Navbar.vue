<template>
    <header class="flex">
        <nav class="flex">
            <div class="app-info flex">
                <div class="logo-container flex">
                    <img src="../assets/logo.svg" alt="">
                </div>
                <div class="logo-text-container flex">
                    <p class="logo-text">DevTracker</p>
                    <p class="description">Manage project bugs and tasks</p>
                </div>
            </div>
            <div class="controls flex">
                <button class="btn-secondary">
                    <img src="../assets/dark_mode.svg" alt="">
                </button>
                <button class="btn-primary">
                    <img src="../assets/add.svg" alt="" class="text-image">
                    Add bug/task
                </button>
            </div>
        </nav>
    </header>
</template>

<style>
    header {
        padding: 12px 64px;
        height: 80px;
        border-bottom: 1px solid var(--separator);
    }

    nav {
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .app-info {
        gap: 12px;
    }

    .logo-container {
        justify-content: center;
        align-items: center;
        padding: 12px;
        background-color: var(--accent);
        border-radius: 8px;
        aspect-ratio: 1 / 1;
    }

    .logo-container img {
        aspect-ratio: 1 / 1;
        height: 18px;
    }

    .logo-text-container {
        flex-direction: column;
        justify-content: space-between;
    }

    .logo-text {
        font-weight: bold;
        font-size: 24px;
    }

    .controls {
        gap: 12px;
    }

    .text-image {
        aspect-ratio: 1 / 1;
        height: 14px;
    }

</style>

<script>
    export default {
        name: "Navbar"
    }
</script>