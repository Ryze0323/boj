<template>
  <ParentComponent :message="message" @update="forwardUpdate" />
</template>

<script>
import ParentComponent from './ParentComponent.vue';

export default {
  name: 'GrandparentComponent',
  components: {
    ParentComponent
  },
  props: {
    message: String
  },
  methods: {
    forwardUpdate(payload) {
      console.log("Updated event received in GrandparentComponent");
    }
  }
}
</script>