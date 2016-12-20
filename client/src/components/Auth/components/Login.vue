<template>
  <form class="form" role="form" accept-charset="UTF-8" @submit.prevent="login()">
    <div class="custom-alert-danger" v-if="error">{{error}}</div>
    <div class="form-group">
      <label class="sr-only" for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        placeholder="Username"
        v-model="credentials.username"
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
        v-model="credentials.password"
        required
      />
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign in</button>
    </div>
  </form>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  mounted(){
    this.$store.commit('CLEAR_SESSION_ERROR')
  },
  computed: {
    error(){
      return this.$store.state.sessionError
    }
  },
  methods: {
    login(){
      this.$store.dispatch('SIGN_IN', {session: this.credentials})
    }
  }
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
