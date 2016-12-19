<template>
  <div class="post-page page">
    <post-item :post="post"></post-item>
    <ul class="comments">
      <comment-item
        v-for="comment in comments"
        :comment="comment"
      ></comment-item>
    </ul>
    <form name="comment" class="comment-form form">
      <div class="form-group">
        <div class="controls">
          <label for="body">Comment on this post</label>
          <textarea
            name="body"
            id="body"
            class="form-control"
            rows="3"
          ></textarea>
          <span class="help-block"></span>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Add Comment</button>
    </form>
    <p>Please log in to leave a comment</p>
  </div>
</template>
<script>
import PostItem from './PostItem'
import CommentItem from './CommentItem'

export default {
  name: 'PostPage',
  components: {
    'post-item': PostItem,
    'comment-item': CommentItem
  },
  data: () => {
    return {
      post: {
        url: "#",
        title: "Test",
        domain: "loopa",
        author: "agarcia038",
        commentsCount: "3",
        votes: 1
      },
      comments: [
        {
          author: "Agarcia038",
          submitted: 'Tue Dec 06 2016 06:09:45 GMT-0500 (COT)',
          body: 'Awesome project!'
        },
        {
          author: "Angarsk8",
          submitted: 'Tue Dec 06 2016 06:09:45 GMT-0500 (COT)',
          body: 'Vue + Phoenix is that sh..!'
        },
        {
          author: "Test User",
          submitted: 'Tue Dec 06 2016 06:09:45 GMT-0500 (COT)',
          body: 'Just another test  comment!'
        }
      ]
    }
  }
}
</script>
