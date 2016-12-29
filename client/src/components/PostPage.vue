<template>
  <custom-loading v-if="isLoading"></custom-loading>
  <div class="post-page page" v-else>
    <not-found v-if="!post"></not-found>
    <div class="post-page page" v-else>
      <post-item :post="post" :transition="'slide-fade-right'"></post-item>
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
        <div class="text-muted markdown-support">
          <span class="badge markdown-badge">
            M<span class="glyphicon glyphicon-arrow-down"></span>
          </span> Styling with Markdown is supported</span>
        </div>
        <div class="form-group">
          <div class="controls">
            <textarea
              name="body"
              id="body"
              class="form-control"
              placeholder="Leave a comment"
              rows="3"
              v-model="commentBody"
              required
            ></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Comment</button>
      </form>
      <p v-else>Please log in to leave a comment</p>
    </div>
  </div>
</template>

<script>
import CustomLoading from './CustomLoading'
import PostItem from './PostItem'
import CommentItem from './CommentItem'
import NotFound from './NotFound'
import { mapGetters } from 'vuex'

export default {
  name: 'PostPage',

  components: {
    CustomLoading,
    PostItem,
    CommentItem,
    NotFound
  },

  data() {
    return {
      commentBody: ''
    }
  },

  computed: {
    ...mapGetters([
      'routeParams',
      'currentUser',
      'posts',
      'isLoading'
    ]),
    post() {
      return JSON.parse(JSON.stringify(this.posts))
        .find(post => post.id == this.routeParams.postId)
    },
    comments() {
      return this.post.comments
        .sort((a, b) => {
          return new Date(a.inserted_at) - new Date(b.inserted_at);
        })
    },
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

<style scoped>
  .markdown-support {
    margin-top: 5px;
    margin-bottom: 12px;
    font-size: 12px;
    margin-left: 5px;
  }

  .markdown-support .markdown-badge {
    border-radius: 2px;
    margin-right: 3px;
    font-size: 8px;
  }
</style>
