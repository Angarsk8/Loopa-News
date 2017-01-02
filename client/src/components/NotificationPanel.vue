<template>
  <li :class="`nav-item dropdown ${showClass}`" @click.stop>
    <a
      href="#"
      class="nav-link dropdown-toggle"
      id="responsiveNavbarDropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click.prevent="toggleNotificationPanel"
    >
      Notifications
      <span
        v-if="notifications.length"
        class="tag tag-default tag-pill"
      >
        {{notifications.length}}
      </span>
      <b class="caret"></b>
    </a>
    <div class="dropdown-menu" aria-labelledby="responsiveNavbarDropdown">
      <li v-if="notifications.length">
        <a
          href="#"
          class="dropdown-item"
          v-for="notification in notifications"
          @click.prevent="deleteNotification(notification)"
        >
          <strong>{{notification.username}}</strong> commented on your post
        </a>
      </li>
      <li v-else><span>No Notifications</span></li>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NotificationPanel',

  created() {
    this.$store.dispatch('getNotifications')
  },

  computed: {
    ...mapGetters([
      'notifications',
      'isNotificationPanelOpen'
    ]),
    showClass() {
      return this.isNotificationPanelOpen ? 'open' : ''
    }
  },

  methods: {
    ...mapActions([
      'toggleNotificationPanel',
    ]),
    deleteNotification({ id, post_id }) {
      this.$store.dispatch('deleteNotification', id)
        .then(() => {
          this.$store.dispatch('toggleNotificationPanel')
          this.$router.push(`/post/${post_id}`)
        })
    }
  }
}
</script>
