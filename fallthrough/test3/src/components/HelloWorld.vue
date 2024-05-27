<template>
  <AncestorComponent @update="update" />
</template>

<script>
import AncestorComponent from "./AncestorComponent.vue"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    AncestorComponent
  },
  methods: {
    update() {
      console.log("Updated event received in HelloWrld");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
