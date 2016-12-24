<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div v-else>
      <access-denied message="Please log in" v-if="!currentUser"></access-denied>
      <not-found v-else-if="!post"></not-found>
      <form
        class="main form page"
        v-else-if="ownPost"
        @submit.prevent="updatePost(editedPost)"
      >
        <div :class="`form-group ${hasError('url')}`">
          <label class="control-label" for="url">URL</label>
          <div class="controls">
            <input
              type="text"
              class="form-control"
              id="url"
              placeholder="Your URL"
              v-model="editedPost.url"
              required
            />
            <p
              class="help-block"
              v-if="'url' in postErrors"
            >{{ postErrors.url }}</p>
          </div>
        </div>
        <div :class="`form-group ${hasError('title')}`">
          <label class="control-label" for="title">Title</label>
          <div class="controls">
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Name your post"
              v-model="editedPost.title"
              required
            />
            <p
              class="help-block"
              v-if="'title' in postErrors"
            >{{ postErrors.title }}</p>
          </div>
        </div>
        <input type="submit" value="Submit" class="btn btn-primary" />
        <hr/>
        <button
          type="button"
          class="btn btn-danger delete"
          @click="deletePost(post.id)"
        >Delete post</button>
      </form>
      <access-denied
        message="This post doesn't belong to you"
        v-else
      ></access-denied>
    </div>
  </div>
</template>

<script>
import CustomLoading from './CustomLoading'
import AccessDenied from './AccessDenied'
import NotFound from './NotFound'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "EditForm",

  components: {
    CustomLoading,
    AccessDenied,
    NotFound
  },

  created(){
    this.$store.dispatch('clearPostErrors')
    this.$store.dispatch('showLoading')
    this.$store.dispatch('getPost', this.$route.params.id)
      .then(() => {
        this.$store.dispatch('hideLoading')
      })
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'postErrors',
      'post',
      'isLoading'
    ]),
    ownPost() {
      return this.post.user.id === this.currentUser.id
    },
    editedPost() {
      return {
        id: this.post.id,
        url: this.post.url,
        title: this.post.title
      }
    }
  },

  methods: {
    ...mapActions([
      'deletePost',
      'updatePost',
    ]),
    hasError(property) {
      return this.postErrors[property] ? 'has-error' : ''
    }
  }
}
</script>
