<template>
  <ChildComponent id="parent-id" class="parent-class" />
</template>

<script>
import ChildComponent from "./ChildComponent.vue"
export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  }
}
</script>
