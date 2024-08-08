<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendUpdate">Send Update</button>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  inheritAttrs: false,
  props: {
    message: String
  },
  methods: {
    sendUpdate() {
      console.log("Updated event received in ChildComponent");
      this.$emit('update', 'Updated from ChildComponent');
    }
  }
}
</script>