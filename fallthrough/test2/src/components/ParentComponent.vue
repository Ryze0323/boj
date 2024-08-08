<template>
<div>
 <ChildComponent :message="message" @update="forwardUpdate" />
</div>
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
    }
  }
}
</script>