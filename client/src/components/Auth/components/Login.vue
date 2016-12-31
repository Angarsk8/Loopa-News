<template>
  <form
    class="form"
    role="form"
    accept-charset="UTF-8"
    @submit.prevent="signIn(user)"
  >
    <transition name="fade">
      <div class="custom-alert-danger" v-if="sessionError">
        {{sessionError}}
      </div>
    </transition>
    <div class="form-group">
      <label class="sr-only" for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder="Username"
        v-model="user.username"
        required
      />
    </div>
    <div class="form-group">
      <label class="sr-only" for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="user.password"
        required
      />
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">
        Sign in
      </button>
    </div>
    <div class="bottom text-center">
      <span class="bottom-text">Not registered?</span>
      <a href="#" @click.prevent="setAuthView('signup')">Create account</a>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',

  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  computed: mapGetters([
    'sessionError'
  ]),

  methods: mapActions([
    'signIn',
    'setAuthView'
  ])
}
</script>
<style>
.custom-alert-danger{
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
  clear: both;
  margin-bottom: 5px;
  pointer-events: auto;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;
  width: auto;
  float: none;
}
</style>
