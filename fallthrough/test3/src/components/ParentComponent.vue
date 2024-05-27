<template>
  <ChildComponent :message="message" @update="forwardUpdate" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  },
  props: {
    message: String
  },
  methods: {
    forwardUpdate(payload) {
      console.log("Updated event received in ParentComponent");
      this.$emit('update', payload);
    }
  }
}
</script>