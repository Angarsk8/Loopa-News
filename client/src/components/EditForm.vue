<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div v-else>
      <access-denied message="Please log in" v-if="!currentUser"></access-denied>
      <not-found v-else-if="!post"></not-found>
      <form
        class="main form page"
        v-else-if="ownPost"
        @submit.prevent="updatePost()"
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
              class="form-control-feedback small"
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
              class="form-control-feedback small"
              v-if="'title' in postErrors"
            >{{ postErrors.title }}</p>
          </div>
        </div>
        <input type="submit" value="Update" class="btn btn-primary" />
        <button
          type="button"
          class="btn btn-danger delete"
          @click="deletePost()"
        >Delete</button>
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
import { mapGetters } from 'vuex'

export default {
  name: 'EditForm',

  components: {
    CustomLoading,
    AccessDenied,
    NotFound
  },

  created() {
    this.$store.dispatch('clearPostErrors')
  },

  computed: {
    ...mapGetters([
      'routeParams',
      'currentUser',
      'currentPost',
      'postErrors',
      'isLoading'
    ]),
    post() {
      return JSON.parse(JSON.stringify(this.currentPost))
    },
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
    updatePost() {
      this.$store.dispatch('updatePost', this.editedPost)
        .then(resp => {
          if(resp) {
            this.$router.push(`/post/${resp.post.id}`)
          }
        })
    },
    deletePost() {
      this.$store.dispatch('deletePost', this.post.id)
        .then(() => {
          this.$router.push('/')
        })
    },
    hasError(property) {
      return this.postErrors[property] ? 'has-danger' : ''
    }
  }
}
</script>

<style scoped>
.btn.delete {
  margin-left: 5px;
}
</style>
