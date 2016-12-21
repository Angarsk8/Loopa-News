<template>
  <div class="posts page">
    <post-item v-for="post in posts" v-bind:post="post"></post-item>
  </div>
</template>
<script>
import PostItem from './PostItem'

export default {
  name: 'Home',
  components: {
    'post-item': PostItem
  },
  // data: () => {
  //   return {
  //     posts: [
  //       {
  //         url: "#",
  //         title: "Test blog",
  //         domain: "loopa",
  //         author: "agarcia038",
  //         commentsCount: "3",
  //         votes: 1,
  //         userId: 1,
  //         upvoters: [1]
  //       },
  //       {
  //         url: "#",
  //         title: "Test",
  //         domain: "loopa",
  //         author: "agarcia038",
  //         commentsCount: "3",
  //         votes: 1,
  //         userId: 2,
  //         upvoters: []
  //       },
  //     ]
  //   }
  // },
  computed: {
    posts(){
      return this.$store.state.posts
    }
  }
}
</script>
