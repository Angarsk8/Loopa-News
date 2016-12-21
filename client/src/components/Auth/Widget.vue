<template>
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        {{ currentUser ? currentUser.username : 'Login / Signup'}}
        <span class="caret"></span>
      </a>
      <ul id="login-dp" class="dropdown-menu" v-if="currentUser">
        <button class="btn btn-block btn-primary" @click="logout()">
          Sign out
        </button>
      </ul>
      <ul id="login-dp" class="dropdown-menu" v-else>
        <li>
          <div class="row">
            <div class="col-md-12">
              <login-form v-if="showLogin"></login-form>
              <signup-form v-else></signup-form>
              <div v-if="showLogin" class="bottom text-center">
                <span class="bottom-text">Not registered?</span>
                <a @click="toggleLogin">Create account</a>
              </div>
              <div v-else class="bottom text-center">
                <span class="bottom-text">Already registered?</span>
                <a @click="toggleLogin">Sign in</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import Login  from './components/Login'
import Signup from './components/Signup'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AuthWidget',
  components: {
    'login-form': Login,
    'signup-form': Signup,
  },
  data: () => {
    return {
      showLogin: true,
    }
  },
  computed: mapState([
    'currentUser'
  ]),
  methods: {
    toggleLogin(e){
      e.stopPropagation();
      this.showLogin = !this.showLogin;
    },
    ...mapActions({
      logout: 'SIGN_OUT'
    })
  }
}
</script>
<style>
#login-dp{
  min-width: 300px;
  padding: 15px;
}
#login-dp a{
  cursor: pointer;
  text-decoration: none;
}
#login-dp .help-block{
  font-size:12px
}
#login-dp .bottom{
  border-top:1px solid #ddd;
  padding:10px;
}
#login-dp .bottom .bottom-text{
  padding: 0;
  display: inline;
  display: inline;
  font-weight: 300;
  color: #979797;
}
#login-dp .form-group {
  margin-bottom: 10px;
}
</style>
