<template>
  <transition-group name="slide-fade-right">
    <post-item
      v-for="post in posts"
      v-bind:key="post.id"
      :post="post"
    ></post-item>
  </transition-group>
</template>

<script>
import PostItem from '../components/PostItem'

export default {
  name: 'PostList',
  props: ['posts'],
  components: {
    PostItem
  }
}
</script>
