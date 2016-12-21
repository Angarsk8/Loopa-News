<template>
  <div class="post">
    <a href="#" class="upvote btn btn-default">⬆</a>
    <div class="post-content">
      <h3><a :href="post.url">{{post.title}}</a><span>{{post.url | domain}}</span></h3>
      <p>
        {{2 | pluralize }},
        submitted by {{post.user.username}},
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
import { mapState } from 'vuex'

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
    ...mapState([
      'currentUser'
    ]),
    ...mapState({
      ownPost ({ currentUser }) {
        return this.post.user.id === (currentUser && currentUser.id)
      }
    })
  }
}
</script>
