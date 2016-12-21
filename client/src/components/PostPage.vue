<template>
  <div class="post-page page">
    <post-item :post="post"></post-item>
    <ul class="comments">
      <comment-item
        v-for="comment in comments"
        :comment="comment"
      ></comment-item>
    </ul>
    <form
      name="comment"
      class="comment-form form"
      v-if="currentUser"
      @submit.prevent="submitComment()"
    >
      <div class="form-group">
        <div class="controls">
          <label for="body">Comment on this post</label>
          <textarea
            name="body"
            id="body"
            class="form-control"
            rows="3"
            v-model="commentBody"
            required
          ></textarea>
          <span class="help-block"></span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Add Comment</button>
    </form>
    <p v-else>Please log in to leave a comment</p>
  </div>
</template>
<script>
import PostItem from './PostItem'
import CommentItem from './CommentItem'

export default {
  name: 'PostPage',
  components: {
    'post-item': PostItem,
    'comment-item': CommentItem
  },
  data(){
    return {
      commentBody: ''
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.currentUser
    },
    post(){
      return this.$store.state.post
    },
    comments(){
      return this.$store.state.post.comments
    }
  },
  methods: {
    submitComment(){
      const comment = {
        author: this.currentUser.username,
        body: this.commentBody
      }
      const data = {id: this.post.id, comment: { comment }}
      this.$store.dispatch('CREATE_COMMENT', data)
        .then(() => {
          this.commentBody = ''
        })
    }
  }
}
</script>
