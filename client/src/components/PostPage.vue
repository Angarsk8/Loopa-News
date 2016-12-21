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
      @submit.prevent="createComment()"
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
import { mapState } from 'vuex'

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
    ...mapState([
      'currentUser',
      'post'
    ]),
    ...mapState({
      'comments': state => state.post && state.post.comments
    }),
    comment(){
      return {
        post_id: this.post.id,
        author: this.currentUser.username,
        body: this.commentBody
      }
    }
  },
  methods: {
    createComment(){
      this.comment
      this.$store.dispatch('createComment', this.comment)
        .then(() => {
          this.commentBody = ''
        })
    }
  }
}
</script>
