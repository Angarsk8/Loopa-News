<template>
  <div class="posts page">
    <post-item v-for="post in posts" v-bind:post="post"></post-item>
  </div>
</template>
<script>
import PostItem from './PostItem'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    'post-item': PostItem
  },
  computed: mapState([
    'posts'
  ])
}
</script>
