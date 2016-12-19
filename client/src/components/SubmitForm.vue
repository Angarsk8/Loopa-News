<template>
  <form class="main form page">
    <div class="form-group">
      <label class="control-label" for="url">URL</label>
      <div class="controls">
        <input
          name="url"
          id="url"
          type="text"
          value=""
          placeholder="Your URL"
          class="form-control"
        />
        <span class="help-block"></span>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label" for="title">Title</label>
      <div class="controls">
        <input
          name="title"
          id="title"
          type="text"
          value=""
          placeholder="Name your post"
          class="form-control"
        />
        <span class="help-block"></span>
      </div>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary" />
    <template v-if="/\/edit$/.test(this.$route.fullPath)">
      <hr/>
      <a class="btn btn-danger delete" href="#">Delete post</a>
    </template>
  </form>
</template>
<script>
export default {
  name: "SubmitForm"
}
</script>
