<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div class="posts page" v-else>
      <post-item v-for="post in posts" v-bind:post="post"></post-item>
    </div>
      <!-- <div class="row" v-else>
        <div class="col-md-10 col-md-offset-1">
          <div class="posts page">
            <post-item v-for="post in posts" v-bind:post="post"></post-item>
          </div>
        </div>
      </div> -->
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

  computed: mapGetters([
    'posts',
    'isLoading'
  ])
}
</script>
