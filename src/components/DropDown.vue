<template>
    <div class="drop-down width-100">
        <div class="drop-down-control flex" @click="toggleMenu">
            <p class="dropdown-label">{{ selected }}</p>
            <img src="../assets/arrow_down.svg" alt="">
        </div>
        <div v-if="isOpen" class="drop-down-menu flex">
            <p v-for="option in options"
                :key="option" 
                class="drop-down-item"
                :class="{ selected: option === selected }"
                @click="selectOption(option)"
            >{{ option }}</p>
        </div>
    </div>
</template>

<style>
    .selected {
        background-color: var(--separator);
    }

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
        background-color: #ffffff;
        /* display: none; */
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
        name: "DopDown",
        props: {
            options: {
                type: Array,
                required: true
            },
        },
        data() {
            return {
                isOpen: false,
                selected: null
            };
        },
        methods: {
            toggleMenu() {
                this.isOpen = !this.isOpen;
            },
            selectOption(option) {
                this.selected = option;
                this.isOpen = false;
                this.$emit('select', option);
            }
        }
    }
</script>