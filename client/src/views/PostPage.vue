<template>
  <custom-loading v-if="isLoading"></custom-loading>
  <div class="post-page page" v-else>
    <not-found v-if="!post"></not-found>
    <div class="post-page page" v-else>
      <post-item :post="post"></post-item>
      <comment-list :comments="comments"></comment-list>
      <form
        name="comment"
        class="comment-form form"
        v-if="currentUser"
        @submit.prevent="createComment()"
      >
        <div class="markdown-support">
          <span class="markdown-tag tag tag-default">M</span>
         Styling with Markdown is supported</span>
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
      <p class="login-message" v-else>Please log in to leave a comment</p>
    </div>
  </div>
</template>

<script>
import CustomLoading from '../components/CustomLoading'
import PostItem from '../components/PostItem'
import CommentList from '../components/CommentList'
import NotFound from './NotFound'
import { mapGetters } from 'vuex'

export default {
  name: 'PostPage',

  components: {
    CustomLoading,
    PostItem,
    CommentList,
    NotFound
  },

  data() {
    return {
      commentBody: ''
    }
  },

  watch: {
    '$route': function(to, from) {
      const samePage = to.name === 'postPage' && from.name === 'postPage'
      const differentPost = this.post.id !== this.$route.params.postId

      if(samePage && differentPost) {
        this.$store.dispatch('showLoading')
        this.$store.dispatch('getPost', this.$route.params.postId)
          .then(() => {
            this.$store.dispatch('hideLoading')
          })
      }
    }
  },

  computed: {
    ...mapGetters([
      'routeParams',
      'currentUser',
      'currentPost',
      'isLoading'
    ]),
    post() {
      return JSON.parse(JSON.stringify(this.currentPost))
    },
    comments() {
      return this.post.comments
        .sort((a, b) => {
          return new Date(a.inserted_at) - new Date(b.inserted_at)
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
  color: #787d81;
}

.markdown-support .markdown-tag {
  border-radius: 2px;
  margin-right: 2px;
  font-size: 8px;
  background-color: #6d7275;
}

.login-message {
  font-size: 13px;
  color: #7e8081;
  margin: 10px 0 0 10px;
}
</style>
