<template>
  <div class="post">
    <a href="#" class="upvote btn btn-default disabled">⬆</a>
    <div class="post-content">
      <h3><a href="#">{{post.title}}</a><span>{{post.domain}}</span></h3>
      <p>
        {{post.votes | pluralize }},
        submitted by {{post.author}},
        <router-link to="/post/123">
          {{post.commentsCount}} comments
        </router-link>
        <router-link to="/post/123/edit"> Edit</router-link>
      </p>
    </div>
    <router-link to="/post/123" class="discuss btn btn-default">
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
    }
  }
}
</script>
