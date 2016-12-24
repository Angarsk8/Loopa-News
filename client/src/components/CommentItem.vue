<template>
  <li>
    <h4>
      <span class="author">{{comment.author}}</span>
      <span class="date">on {{comment.inserted_at}}</span>
    </h4>
    <p>{{comment.body}}</p>
  </li>
</template>

<script>
export default {
  name: 'CommentItem',
  props: ['comment']
}
</script>

<style scoped>
  p {
    margin-top: 5px;
    font-size: 14px;
  }
</style>
