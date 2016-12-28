<template>
  <ul class="nav navbar-nav navbar-right" @click.stop>
    <li :class="`dropdown ${showClass}`">
      <a href="#" class="dropdown-toggle" @click.prevent="toggleAuthWidget">
        {{ currentUser ? currentUser.username : 'Login / Signup'}}
        <span class="caret"></span>
      </a>
      <ul id="login-dp" class="dropdown-menu" v-if="currentUser">
        <button class="btn btn-block btn-primary" @click="signOut()">
          Sign out
        </button>
      </ul>
      <ul id="login-dp" class="dropdown-menu" v-else>
        <li>
          <div class="row">
            <div class="col-md-12">
              <login-form v-if="showLoginView">
                <div class="bottom text-center">
                  <span class="bottom-text">Not registered?</span>
                  <a href="#" @click.prevent="toggleLoginView()">Create account</a>
                </div>
              </login-form>
              <signup-form v-else>
                <div class="bottom text-center">
                  <span class="bottom-text">Already registered?</span>
                  <a href="#" @click.prevent="toggleLoginView()">Sign in</a>
                </div>
              </signup-form>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthWidget',

  components: {
    'login-form': Login,
    'signup-form': Signup,
  },

  data() {
    return {
      showLoginView: true,
    }
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthWidgetOpen'
    ]),
    showClass(){
      return this.isAuthWidgetOpen ? 'open' : ''
    }
  },

  methods: {
    ...mapActions([
      'signOut',
      'toggleAuthWidget'
    ]),
    toggleLoginView() {
      this.showLoginView = !this.showLoginView;
    }
  }
}
</script>

<style>
#login-dp{
  min-width: 300px;
  padding: 15px;
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
  font-weight: 300;
  color: #979797;
}

#login-dp .form-group {
  margin-bottom: 10px;
}
</style>
