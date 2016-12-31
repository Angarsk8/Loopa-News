<template>
  <li class="comment-item">
    <div class="">
      <h4>
        <span class="author">{{comment.author}}</span>
        <span class="date"> commented {{comment.inserted_at | timeAgo}} ago</span>
        <span class="date text-warning hidden-xs" v-if="isEdited">
          | edited
          {{comment.updated_at | timeAgo}} ago
        </span>
        <template v-if="ownComment">
          <span
            title="delete"
            class="comment-icon delete glyphicon glyphicon-trash pull-right"
            @click="deleteComment(comment)"
          ></span>
          <span
            title="edit"
            class="comment-icon edit glyphicon glyphicon-pencil pull-right"
            @click="toggleEditable()"
          ></span>
        </template>
      </h4>
    </div>
    <hr />
    <form
      name="comment"
      class="comment-form form"
      v-if="ownComment && editable"
    >
      <div class="form-group">
        <div class="controls">
          <textarea
            name="body"
            id="body"
            class="form-control"
            placeholder="with markdown support"
            :rows="commentBodyLines"
            v-model="editedComment.body"
            required
            autofocus
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-success"
        @click.prevent = "updateComment()"
      >Update</button>
    </form>
    <div class="comment-body" v-html="compiledMarkdown" v-else></div>
  </li>
</template>

<script>
import marked from 'marked'
import { decodeHTML } from 'entities'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentItem',

  props: ['comment'],

  data() {
    return {
      editable: false,
      editedComment: {
        ...this.comment,
        body: decodeHTML(this.comment.body)
      }
    }
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    compiledMarkdown() {
      const decodedBody = decodeHTML(this.comment.body)
      return marked(decodedBody, { sanitize: true })
    },
    ownComment() {
      return this.comment.author === (this.currentUser && this.currentUser.username)
    },
    commentBodyLines() {
      const commentBodyLines = this.comment.body.split(/\n/).length
      return commentBodyLines <= 3 ? 3 : commentBodyLines
    },
    isEdited() {
      return this.comment.inserted_at !== this.comment.updated_at
    }
  },

  methods: {
    ...mapActions([
      'deleteComment'
    ]),
    updateComment() {
      this.$store.dispatch('updateComment', this.editedComment)
        .then(() => {
          this.toggleEditable()
        })
    },
    toggleEditable() {
      this.editable = !this.editable
    }
  }
}
</script>
