<template>
  <form class="form" @submit.prevent="signUp(credentials)">
    <div :class="`form-group ${hasError('username')}`">
      <label class="sr-only" for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder="Username"
        v-model="credentials.username"
        required
      />
      <p
        class="help-block"
        v-if="'username' in registrationErrors"
      >{{ registrationErrors.username }}</p>
    </div>
    <div :class="`form-group ${hasError('password')}`">
      <label class="sr-only" for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="credentials.password"
        required
      />
      <p
        class="help-block"
        v-if="'password' in registrationErrors"
      >{{ registrationErrors.password }}</p>
    </div>
    </div>
    <div :class="`form-group ${hasError('password_confirmation')}`">
      <label class="sr-only" for="confirm-password">Confirm password</label>
      <input
        type="password"
        class="form-control"
        id="confirm-password"
        placeholder="Confirm password"
        v-model="credentials.password_confirmation"
        required
      />
      <p
        class="help-block"
        v-if="'password_confirmation' in registrationErrors"
      >{{ registrationErrors.password_confirmation }}</p>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign up</button>
    </div>
  </form>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "Signup",
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  mounted(){
    this.$store.dispatch('clearRegistrationErrors')
  },
  computed: mapState([
    'registrationErrors'
  ]),
  methods: {
    ...mapActions([
      'signUp'
    ]),
    hasError(property){
      return this.registrationErrors[property] ? 'has-error' : ''
    }
  }
}
</script>
