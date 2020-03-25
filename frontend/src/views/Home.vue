<template>
  <div class="row">
    <div class="col-8">
      <router-view :term="term"/>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
import store from "@/store.js";

export default {
  props: ["term"],
  data() {
    return store;
  },
  name: "home"
};
</script>