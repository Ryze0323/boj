<template>
  <GrandparentComponent message="Hello from Ancestor" @update="handleUpdate" />
</template>

<script>
import GrandparentComponent from './GrandparentComponent.vue';

export default {
  name: 'AncestorComponent',
  components: {
    GrandparentComponent
  },
  methods: {
    handleUpdate(payload) {
      console.log("Updated event received in AncestorComponent");
    }
  }
}
</script>