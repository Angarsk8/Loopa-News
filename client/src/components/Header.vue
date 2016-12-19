<template>
  <nav class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
    <button
      type="button"
      class="navbar-toggle collapsed"
      data-toggle="collapse"
      data-target="#navigation"
    >
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <router-link class="navbar-brand" to="/">Microscope</router-link>
    </div>
    <div class="collapse navbar-collapse" id="navigation">
      <ul class="nav navbar-nav">
        <li class="active">
          <router-link to="/new">New</router-link>
        </li>
        <li>
          <router-link to="/submit">Submit Post</router-link>
        </li>
        <notifications-panel></notifications-panel>
      </ul>
      <login-widget></login-widget>
    </div>
  </nav>
</template>
<script>
import Notification from './Notification'
import LoginWidget from './LoginWidget'

export default {
  name: "Header",
  components: {
    'notifications-panel': Notification,
    'login-widget': LoginWidget
  }
}
</script>
