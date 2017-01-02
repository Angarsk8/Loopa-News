<template>
  <div class="access-denied page jumbotron">
    <div class="text-xs-center">
      <h1>Access Denied</h1>
      <p>
        You can't get here! {{message}}
      </p>
      <router-link to="/" class="">
        <span class="fa fa-home"></span> Take me home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessDenied',
  props: ['message']
}
</script>
