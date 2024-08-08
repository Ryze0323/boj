<template>
  <div>
    Child Component Content
    {{ $attrs }}
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  inheritAttrs: false,
}
</script>