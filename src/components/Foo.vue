<template>
  <div class="foo"
       @click="clickHandle">Foo.vue
  </div>
</template>

<script>
export default {
  name: 'foo',
  methods: {
    clickHandle() {
      console.log('click handle')
    }
  }
}
</script>
<style scoped>
.foo {
  color: red;
}
</style>