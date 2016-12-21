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
        <li :class="activeRouteClass('home','newPosts')">
          <router-link to="/new">New</router-link>
        </li>
        <li :class="activeRouteClass('postSubmit')" v-if="currentUser">
          <router-link to="/submit">Submit Post</router-link>
        </li>
        <notifications-panel v-if="currentUser"></notifications-panel>
      </ul>
      <login-widget></login-widget>
    </div>
  </nav>
</template>
<script>
import Notification from './Notification'
import AuthWidget   from './Auth/Widget'

export default {
  name: "Header",
  components: {
    'notifications-panel': Notification,
    'login-widget': AuthWidget
  },
  computed: {
    currentUser(){
      return this.$store.state.currentUser
    }
  },
  methods: {
    activeRouteClass(...routes){
      const active = routes.some(route => this.$route.name == route)
      return active && "active"
    }
  }
}
</script>
