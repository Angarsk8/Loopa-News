<template>
  <form class="form" @submit.prevent="signup()">
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
      <p class="help-block" v-if="errors.username">{{ errors.username }}</p>
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
      <p class="help-block" v-if="errors.password">{{ errors.password }}</p>
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
        v-if="errors.password_confirmation"
      >{{ errors.password_confirmation }}</p>
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign up</button>
    </div>
  </form>
</template>
<script>
import auth from '../../../services/auth'

export default {
  name: "Signup",
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        password_confirmation: ''
      },
      errors: Object.assign({}, this.credentials)
    }
  },
  methods: {
    signup() {
      auth.signup(this, {user: this.credentials})
    },
    hasError(property){
      return this.errors[property] ? 'has-error' : ''
    }
  }
}
</script>
