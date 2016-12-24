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
        <notification-panel v-if="currentUser"></notification-panel>
      </ul>
      <auth-widget></auth-widget>
    </div>
  </nav>
</template>

<script>
import NotificationPanel from './NotificationPanel'
import AuthWidget   from './Auth/AuthWidget'
import { mapGetters } from 'vuex'

export default {
  name: "Header",

  components: {
    NotificationPanel,
    AuthWidget
  },

  computed: mapGetters([
    'currentUser'
  ]),

  methods: {
    activeRouteClass(...routes) {
      const active = routes.some(route => this.$route.name == route)
      return active && "active"
    }
  }
}
</script>
