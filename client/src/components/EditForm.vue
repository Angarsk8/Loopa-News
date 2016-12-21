<template>
  <access-denied message="Please log in" v-if="!currentUser"></access-denied>
  <not-found message="Please log in" v-else-if="!post"></not-found>
  <form class="main form page" v-else-if="ownPost" @submit.prevent="updatePost()">
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
        <p class="help-block" v-if="'url' in errors">{{ errors.url }}</p>
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
        <p class="help-block" v-if="'title' in errors">{{ errors.title }}</p>
      </div>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary" />
    <hr/>
    <button
      type="button"
      class="btn btn-danger delete"
      @click="deletePost()"
    >Delete post</button>
  </form>
  <access-denied message="This post doesn't belong to you" v-else></access-denied>
</template>
<script>
import AccessDenied from './AccessDenied'
import NotFound from './NotFound'

export default {
  name: "EditForm",
  components: {
    'access-denied': AccessDenied,
    'not-found': NotFound,
  },
  mounted(){
    this.$store.commit('CLEAR_POST_ERRORS')
  },
  computed: {
    currentUser(){
      return this.$store.state.currentUser
    },
    post(){
      return this.$store.state.post
    },
    ownPost(){
      return this.post.user.id === this.currentUser.id
    },
    errors(){
      return this.$store.state.postErrors
    }
  },
  methods: {
    updatePost(){
      const post = {url: this.post.url, title: this.post.title}
      const data = {id: this.post.id, post: { post }}
      this.$store.dispatch('UPDATE_POST', data)
    },
    deletePost(){
      this.$store.dispatch('DELETE_POST', this.post.id)
    },
    hasError(property){
      return this.errors[property] ? 'has-error' : ''
    }
  }
}
</script>
