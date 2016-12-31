<template>
  <div>
    <button class="btn btn-block btn-default" @click="setAuthView('change')">
      Change password
    </button>
    <button class="btn btn-block btn-primary" @click="signOut()">
      Sign out
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Logout',

  methods: {
    ...mapActions([
      'setAuthView'
    ]),
    signOut() {
      this.$store.dispatch('signOut')
        .then(() => {
          this.setAuthView('login')
        })
    }
  }
}
</script>
