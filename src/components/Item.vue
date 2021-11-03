<!-- Item.vue -->
<template>
  <div>
    <div @click="clickHandle">{{ item.title }}-{{ $route.params.id }}</div>
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  asyncData({store, route}) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  data() {
    return {
      text: '我是一个文本组件'
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  methods: {
    clickHandle() {
      console.log('clickHandle1111')
    }
  },
  mounted() {
  }
}
</script>