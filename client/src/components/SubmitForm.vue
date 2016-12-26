<template>
  <form
    class="main form page"
    v-if="currentUser"
    @submit.prevent="createPost(post)"
  >
    <div :class="`form-group ${hasError('url')}`">
      <label class="control-label" for="url">URL</label>
      <div class="controls">
        <input
          type="text"
          class="form-control"
          id="url"
          placeholder="Your URL"
          v-model="post.url"
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
          v-model="post.title"
          required
        />
        <p
          class="help-block"
          v-if="'title' in postErrors"
        >{{ postErrors.title }}</p>
      </div>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary" />
  </form>
  <access-denied message="Please log in" v-else></access-denied>
</template>

<script>
import AccessDenied from './AccessDenied'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "SubmitForm",

  components: {
    'access-denied': AccessDenied
  },

  data() {
    return {
      post: {
        url: '', 
        title: ''
      }
    }
  },

  mounted() {
    this.$store.dispatch('clearPostErrors')
  },

  computed: mapGetters([
    'currentUser',
    'postErrors'
  ]),

  methods: {
    ...mapActions([
      'createPost'
    ]),
    hasError(property) {
      return this.postErrors[property] ? 'has-error' : ''
    }
  }
}
</script>
