<template>
  <transition name="slide-fade">
    <transition-group name="slide-fade" tag="ul" class="comments">
      <comment-item
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      ></comment-item>
    </transition-group>
  </transition>
</template>

<script>
import CommentItem from '../components/CommentItem'

export default {
  name: 'CommentList',
  props: ['comments'],
  components: {
    CommentItem
  }
}
</script>
