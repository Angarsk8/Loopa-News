<template>
  <li :class="`dropdown ${showClass}`" @click.stop>
    <a
      href="#"
      class="dropdown-toggle my-toggle"
      @click.prevent="toggleNotificationPanel"
    >
      Notifications
      <span
        v-if="notifications.length"
        class="badge badge-inverse"
      >
        {{notifications.length}}
      </span>
      <b class="caret"></b>
    </a>
    <ul class="notification dropdown-menu">
      <li v-if="notifications.length">
        <a
          href="#"
          v-for="notification in notifications"
          @click.prevent="deleteNotification(notification)"
        >
          <strong>{{notification.username}}</strong> commented on your post
        </a>
      </li>
      <li v-else><span>No Notifications</span></li>
    </ul>
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
