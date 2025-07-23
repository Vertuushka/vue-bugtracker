<template>
    <div class="search-bar-container">
        <label for="searchbar-input" class="searchbar-input-label flex">
            <span class="material-symbols-rounded description">search</span>
            <input type="text" name="searchbar" id="searchbar-input" placeholder="Search bugs and tasks...">
        </label>
    </div>
</template>

<style>
    .search-bar-container{
        min-width: 65%;
    }

    .searchbar-input-label {
        width: 100%;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--separator);
        border-radius: 8px;
        position: relative;
    }

    .searchbar-input-label input {
        width: 100%;
        border: none;
        border-radius: 8px;
        padding: 12px 56px;
    }

    .searchbar-input-label span {
        position: absolute;
        left: 16px;
    }

</style>

<script>
    export default {
        name: "SearchBar"
    }
</script>