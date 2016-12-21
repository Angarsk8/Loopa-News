<template>
  <div class="post">
    <a href="#" class="upvote btn btn-default">⬆</a>
    <!-- <a href="#" :class="`${upvotedClass} upvote btn btn-default `">⬆</a> -->
    <div class="post-content">
      <h3><a :href="post.url">{{post.title}}</a><span>{{post.url | domain}}</span></h3>
      <p>
        <!-- {{post.votes | pluralize }}, -->
        {{2 | pluralize }},
        submitted by {{post.user.username}},
        <router-link to="/post/123">
          <!-- {{post.commentsCount}} comments -->
          {{3}} comments
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
export default {
  name: 'PostItem',
  props: ['post'],
  filters: {
    pluralize(n, thing = 'Vote'){
      return n === 1 ? `1 ${thing}` : `${n} ${thing}s`;
    },
    domain(url){
      const a = document.createElement('a');
      a.href = url;
      return a.hostname;
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.currentUser
    },
    upvotedClass(){
      const userId   = this.currentUser && this.currentUser.id
      const upvoters = this.post.upvoters

      if (userId && !upvoters.includes(userId)) {
        return "btn-primary upvotable";
      } else {
        return "disabled";
      }
    },
    ownPost(){
      return this.post.user.id === (this.currentUser && this.currentUser.id)
    }
  }
}
</script>
