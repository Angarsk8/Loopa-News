<template>
  <div class="post">
    <a
      :class="`${upvotedClass} upvote btn btn-default `"
      @click.prevent="upvotePost({ vote, $route })"
    >⬆</a>
    <div class="post-content">
      <h3><a :href="post.url">{{post.title}}</a><span>{{post.url | domain}}</span></h3>
      <p>
        {{post.votes.length | pluralize }},
        submitted by <span class="author">{{post.user.username}}</span>,
        <router-link :to="`/post/${post.id}`">
          {{post.comments.length}} comments
        </router-link>
        <router-link :to="`/post/${post.id}/edit`" v-if="ownPost"> Edit</router-link>
      </p>
    </div>
    <router-link :to="`/post/${post.id}`" class="discuss btn btn-default">
      Discuss
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PostItem',

  props: ['post'],

  filters: {
    pluralize(n, thing = 'Vote') {
      return n === 1 ? `1 ${thing}` : `${n} ${thing}s`;
    },
    domain(url) {
      const a = document.createElement('a');
      a.href = url;
      return a.hostname;
    }
  },

  computed: {
    ...mapGetters([
      'currentUser'
    ]),
    ownPost() {
      return this.post.user.id === (this.currentUser && this.currentUser.id)
    },
    vote(){
      return {
        post_id: this.post.id,
        author: this.currentUser.username
      }
    },
    upvoters(){
      return this.post.votes.map(vote => vote.author)
    },
    upvotedClass(){
      const author   = this.currentUser && this.currentUser.username
      const upvoters = this.upvoters
      if (author && !upvoters.includes(author)) {
        return "btn-primary upvotable";
      } else {
        return "disabled";
      }
    },
  },

  methods: mapActions([
    'upvotePost'
  ])
}
</script>
