<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div class="posts page" v-else>
      <post-item v-for="post in posts" v-bind:post="post"></post-item>
      <custom-loading v-if="isFetchingMore"></custom-loading>
      <router-link
        class="load-more"
        :to="`/${routeName}/${nextLimit}`"
        v-else-if="loadMore"
      >
        Load more
      </router-link>
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

  watch: {
    '$route': function(to, from) {
      if(to.name === 'latest' && from.name === 'latest') {
        this.$store.dispatch('showFetchingMore')
        this.$store.dispatch('getPosts', this.$route.params.limit)
          .then(() => {
            this.$store.dispatch('hideFetchingMore')
          })
      }
    }
  },

  computed: {
    ...mapGetters([
      'posts',
      'isLoading',
      'isFetchingMore',
      'pagination'
    ]),
    routeName() {
      if(this.$route.name === 'home' || this.$route.name === 'latest') {
        return 'latest'
      }
      if(this.$route.name === 'best') {
        return 'best'
      }
    },
    loadMore() {
      return this.posts.length < this.pagination.total_entries
    },
    nextLimit() {
      return this.posts.length + this.pagination.page_size
    }
  }
}
</script>
