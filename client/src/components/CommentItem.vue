<template>
  <transition name="slide-fade">
    <li class="comment-item">
      <h4>
        <span class="author">{{comment.author}}</span>
        <span class="date"> commented {{comment.inserted_at | timeAgo}} ago</span>
        <span class="date text-warning" v-if="isEdited"> | edited</span>
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
  </transition>
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

<style>
.comment-body {
  margin: 0 0 0 5px;
  font-size: 15px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}

.comment-icon.delete:hover{
  color: #a94442;
  transform: scale(1.2);
}

.comment-icon.edit:hover{
  color: #8a6d3b;
}

.comment-icon:before {
  margin: 0 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>
