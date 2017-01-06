<template>
  <nav class="navbar navbar-light">
    <button
      class="navbar-toggler hidden-md-up"
      type="button" data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>
    <router-link class="navbar-brand" to="/">Phoenixscope</router-link>
    <div class="collapse navbar-toggleable-sm" id="navbarResponsive">
      <ul class="nav navbar-nav">
        <li :class="`nav-item ${activeRouteClass('home', 'latest')}`">
          <router-link
            class="nav-link"
            to="/latest"
          >Latest</router-link>
        </li>
        <li :class="`new-nav-item nav-item ${activeRouteClass('postSubmit')}`">
          <router-link
            class="new btn btn-outline-success nav-link"
            to="/submit"
            v-if="currentUser"
          >New</router-link>
        </li>
        <notification-panel v-if="currentUser"></notification-panel>
        <auth-widget></auth-widget>
      </ul>
    </div>
  </nav>
</template>

<script>
import NotificationPanel from './NotificationPanel'
import AuthWidget from './Auth/AuthWidget'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',

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
      return active && 'active'
    }
  }
}
</script>

<style>
.new {
  color: #5cb85c !important;
}

.new:hover, .new:focus {
  color: #fff !important;
}

.new-nav-item.active .new{
  color: #fff !important;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
</style>
