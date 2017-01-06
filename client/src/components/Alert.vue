<template>
  <transition name="slide-fade">
    <div
      role="alert"
      :class="`alert alert-${alert.type}`"
      @click="removeAlert(alert.id)"
    >
      <span class="close">&times;</span>
      <a
        href="#"
        @click.prevent="deleteNotification(alert.notification)"
        v-if="alert.notification"
      >
        {{alert.message}}
      </a>
      <span v-else>{{alert.message}}</span>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Alert',

  props: ['alert'],

  computed: mapGetters([
    'isNotificationPanelOpen'
  ]),

  methods: {
    ...mapActions([
      'removeAlert'
    ]),
    deleteNotification({ id, post_id }) {
      this.$store.dispatch('deleteNotification', id)
        .then(() => {
          if(this.isNotificationPanelOpen) {
            this.$store.dispatch('toggleNotificationPanel')
          }
          this.$router.push(`/post/${post_id}`)
        })
    }
  }
}
</script>

<style>
.alert {
  min-width: 250px;
  max-width: 350px;
  float: right;
  clear: both;
  margin-bottom: 5px;
  pointer-events: auto;
}
</style>
