<template>
    <div class="drop-down width-100" ref="dropdownRef">
        <div 
            class="drop-down-control flex" 
            @click="toggleMenu"
            :class="disabled ? `disabled` : null"
        >
            <p class="dropdown-label">{{ selected || "Select"}}</p>
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
    }

    .drop-down-item {
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
    }

    .drop-down-item:hover {
        background-color: var(--separator);
    }

    .disabled {
        background-color: var(--separator);
        cursor: not-allowed;
    }

</style>

<script>
    export default {
        name: "DopDown",
        props: {
            options: {
                type: Array,
                required: true
            },
            modelValue: {
                type: String,
                required: false,
                default: null
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                isOpen: false,
                selected: null,
            };
        },
        created() {
            this.selected = this.modelValue;
        },
        watch: {
            modelValue(newVal) {
                this.selected = newVal;
            }
        },
        emits: ['update:modelValue'],
        methods: {
            toggleMenu() {
                if (this.disabled === true) {
                    this.isOpen = false;
                    return;
                }
                this.isOpen = !this.isOpen;
            },
            selectOption(option) {
                this.selected = option;
                this.isOpen = false;
                this.$emit('update:modelValue', option);
            },
            handleClickOutside(event) {
                const dropdown = this.$refs.dropdownRef;
                if (dropdown && !dropdown.contains(event.target)) {
                    this.isOpen = false;
                }
            },
        },
        mounted() {
            document.addEventListener("click", this.handleClickOutside);
        },
        beforeUnmount() {
            document.removeEventListener("click", this.handleClickOutside);
        },
    }
</script>