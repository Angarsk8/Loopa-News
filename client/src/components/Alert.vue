<template>
  <transition name="slide-fade">
    <div
      role="alert"
      :class="`alert alert-${alert.type}`"
      @click="removeAlert(alert.id)"
    >
      <button type="button" class="close">&times;</button>
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
import { mapActions } from 'vuex'

export default {
  name: 'Alert',

  props: ['alert'],

  methods: {
    ...mapActions([
      'removeAlert'
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

<style>
.alert {
  width: 300px;
  float: right;
  clear: both;
  margin-bottom: 5px;
  pointer-events: auto;
}
</style>
