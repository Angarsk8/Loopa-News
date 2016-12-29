<template>
  <div class="access-denied page jumbotron">
    <h2>Access Denied</h2>
    <p>You can't get here! {{message}}.</p>
  </div>
</template>

<script>
export default {
  name: 'AccessDenied',
  props: ['message']
}
</script>
