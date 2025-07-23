<template>
  <div id="app">
    <Navbar />
    <DropDown />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import DropDown from "./components/DropDown.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
