<template>
  <div class="not-found page jumbotron">
    <div class="text-xs-center">
      <h1>404</h1>
      <p>Sorry, we couldn't find a page at this address</p>
      <router-link to="/" class="">
        <span class="fa fa-home"></span> Take me home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
