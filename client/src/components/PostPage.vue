<template>
  <div>
    <custom-loading v-if="isLoading"></custom-loading>
    <div class="post-page page" v-else>
    <custom-loading></custom-loading>
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
  </div>
</template>

<script>
import CustomLoading from './CustomLoading'
import PostItem from './PostItem'
import CommentItem from './CommentItem'
import { mapGetters } from 'vuex'

export default {
  name: 'PostPage',

  components: {
    CustomLoading,
    PostItem,
    CommentItem
  },

  created(){
    this.$store.dispatch('showLoading')
    this.$store.dispatch('getPost', this.$route.params.postId)
      .then(() => {
        this.$store.dispatch('hideLoading')
      })
  },

  data() {
    return {
      commentBody: ''
    }
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'post',
      'comments',
      'isLoading'
    ]),
    comment() {
      return {
        post_id: this.post.id,
        author: this.currentUser.username,
        body: this.commentBody
      }
    },
    notification() {
      return {
        post_id: this.post.id,
        username: this.currentUser.username
      }
    }
  },

  methods: {
    createComment() {
      this.$store.dispatch('createComment', this.comment)
        .then(() => {
          this.$store.dispatch('createNotification', this.notification)
          this.commentBody = ''
        })
    }
  }
}
</script>
