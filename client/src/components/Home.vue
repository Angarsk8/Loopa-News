<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div class="posts page" v-else>
      <post-item v-for="post in posts" v-bind:post="post"></post-item>
    </div>
  </div>
</template>

<script>
import CustomLoading from './CustomLoading'
import PostItem from './PostItem'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',

  components: {
    CustomLoading,
    PostItem
  },

  created(){
    this.$store.dispatch('showLoading')
    this.$store.dispatch('getPosts')
      .then(() => {
        this.$store.dispatch('hideLoading')
      })
  },

  computed: mapGetters([
    'posts',
    'isLoading'
  ])
}
</script>
