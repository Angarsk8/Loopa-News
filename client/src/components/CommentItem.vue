<template>
  <li class="comment-item">
    <div class="">
      <h4>
        <span class="author">{{comment.author}}</span>
        <span class="date"> commented {{comment.inserted_at | timeAgo}} ago</span>
        <template v-if="isEdited">
          <span class="date hidden-xs-down"> | </span>
          <span class="date text-warning hidden-xs-down" v-if="isEdited">
            edited
            {{comment.updated_at | timeAgo}} ago
          </span>
        </template>
        <template v-if="ownComment">
          <i
            class="comment-icon delete fa fa-trash-o float-xs-right"
            aria-hidden="true"
            @click="deleteComment(comment)"
          ></i>
          <i
            class="comment-icon edit fa fa-pencil-square-o float-xs-right"
            aria-hidden="true"
            @click="toggleEditable()"
          ></i>
        </template>
      </h4>
    </div>
    <hr />
    <div v-if="ownComment && editable">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#home" role="tab">Write</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#profile" role="tab">Preview</a>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane active" id="home" role="tabpanel">
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
          </form>
        </div>
        <div class="tab-pane" id="profile" role="tabpanel">
          <div
            class="comment-body edited-comment-body"
            v-html="compileMarkdown(editedComment.body)"
          ></div>
        </div>
        <button
          type="submit"
          class="btn btn-success"
          @click.prevent = "updateComment()"
        >Update</button>
      </div>
    </div>
    <div
      class="comment-body"
      v-html="compileMarkdown(comment.body)"
      v-else
    ></div>
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
    },
    compileMarkdown(text) {
      const decodedBody = decodeHTML(text)
      return marked(decodedBody, { sanitize: true })
    }
  }
}
</script>
