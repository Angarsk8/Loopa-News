<template>
  <div class="post">
    <a
      class="upvote btn btn-default disabled"
      v-if="!currentUser"
    >
      <span class="glyphicon glyphicon-arrow-up"></span>
    </a>
    <a
      class="upvote btn btn-primary upvotable"
      @click.prevent="upvotePost(vote)"
      v-else-if="upvotable"
    >
      <span class="glyphicon glyphicon-arrow-up"></span>
    </a>
    <a
      class="upvote btn btn-danger upvotable"
      @click.prevent="downvotePost({post_id: post.id, voteId})"
      v-else
    >
      <span class="glyphicon glyphicon-arrow-down"></span>
    </a>
    <div class="post-content">
      <h3>
        <a :href="post.url">{{post.title}}</a>
        <span class="hidden-xs domain">{{post.url | domain}}</span>
        <router-link
          :to="`/post/${post.id}/edit`"
          v-if="ownPost"
          ><span class="edit">[edit]</edit></span>
        </router-link>
      </h3>
      <hr/>
      <p>
        {{post.votes.length | pluralize('vote') }},
        by <span class="author">{{post.user.username}}</span>
        <span class="hidden-xs">{{ post.inserted_at | timeAgo}} ago</span>,
        <router-link :to="`/post/${post.id}`" class="hidden-xs">
          {{post.comments.length}} comments
        </router-link>
        <router-link :to="`/post/${post.id}`" class="visible-xs-*-inline">
          discuss
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PostItem',

  props: ['post'],

  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    ownPost() {
      return this.post.user.id === (this.currentUser && this.currentUser.id)
    },
    vote() {
      return {
        post_id: this.post.id,
        author: this.currentUser.username,
      }
    },
    voteId() {
      const currentUserVote = this.post.votes
        .find(vote => {
          return vote.author === this.currentUser.username
        })

      if(currentUserVote){
        return currentUserVote.id
      }
    },
    upvoters() {
      return this.post.votes.map(vote => vote.author)
    },
    upvotable() {
      const author   = this.currentUser && this.currentUser.username
      const upvoters = this.upvoters

      if (author && !upvoters.includes(author)) {
        return true
      } else {
        return false
      }
    }
  },

  methods: mapActions([
    'upvotePost',
    'downvotePost'
  ])
}
</script>
