<template>
  <form class="form" @submit.prevent="changePassword(session)">
    <div :class="`form-group ${hasError('current_password')}`">
      <label class="sr-only" for="current-password">Current password</label>
      <input
        type="password"
        class="form-control"
        id="current-password"
        placeholder="Current password"
        v-model="session.current_password"
        required
      />
      <p
        class="form-control-feedback"
        v-if="'current_password' in changePasswordErrors"
      >{{ changePasswordErrors.current_password }}</p>
    </div>
    <div :class="`form-group ${hasError('password')}`">
      <label class="sr-only" for="new-password">New password</label>
      <input
        type="password"
        class="form-control"
        id="new-password"
        placeholder="New password"
        v-model="session.password"
        required
      />
      <p
        class="form-control-feedback"
        v-if="'password' in changePasswordErrors"
      >{{ changePasswordErrors.password }}</p>
    </div>
    </div>
    <div :class="`form-group ${hasError('password_confirmation')}`">
      <label class="sr-only" for="confirm-new-password">Confirm new password</label>
      <input
        type="password"
        class="form-control"
        id="confirm-new-password"
        placeholder="Confirm new password"
        v-model="session.password_confirmation"
        required
      />
      <p
        class="form-control-feedback"
        v-if="'password_confirmation' in changePasswordErrors"
      >{{ changePasswordErrors.password_confirmation }}</p>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Change password</button>
      <button
        type="button"
        class="btn btn-secondary btn-block"
        @click="setAuthView('logout')"
      >Cancel</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ChangePassword',

  data() {
    return {
      session: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  created() {
    this.$store.dispatch('clearChangePasswordErrors')
  },

  computed: mapGetters([
    'changePasswordErrors'
  ]),

  methods: {
    ...mapActions([
      'changePassword',
      'setAuthView'
    ]),
    hasError(property) {
      return this.changePasswordErrors[property] ? 'has-danger' : ''
    }
  }
}
</script>
