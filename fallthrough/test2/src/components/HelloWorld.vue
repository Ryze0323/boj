<script setup>
import AncestorComponent from "./AncestorComponent.vue"
const update = () => {
  console.log("Updated event received in HelloWrld");
}

</script>

<template>
  <AncestorComponent @update="update" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
