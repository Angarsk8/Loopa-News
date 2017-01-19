<template>
  <li :class="`nav-item dropdown float-md-right ${showClass}`" @click.stop>
    <a
      href="#"
      class="nav-link dropdown-toggle"
      @click.prevent="toggleAuthWidget"
    >
      {{ currentUser ? currentUser.username : 'Login / Signup'}}
    </a>
    <ul id="auth-dropdown" class="dropdown-menu" v-if="currentUser">
      <change-form v-if="isAuthView('change')"></change-form>
      <logout-view v-else></logout-view>
    </ul>
    <ul id="auth-dropdown" class="dropdown-menu" v-else>
      <li>
        <div class="row">
          <div class="col-md-12">
            <login-form v-if="isAuthView('login')"></login-form>
            <signup-form v-else-if="isAuthView('signup')"></signup-form>
          </div>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import Login  from './components/Login'
import Signup from './components/Signup'
import Change from './components/Change'
import Logout from './components/Logout'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AuthWidget',

  components: {
    'login-form': Login,
    'signup-form': Signup,
    'change-form': Change,
    'logout-view': Logout
  },

  computed: {
    ...mapGetters([
      'currentUser',
      'isAuthWidgetOpen',
      'authView'
    ]),
    showClass(){
      return this.isAuthWidgetOpen ? 'open' : ''
    }
  },

  methods: {
    ...mapActions([
      'toggleAuthWidget',
    ]),
    isAuthView(name) {
      return this.authView === name
    }
  }
}
</script>

<style>
#auth-dropdown{
  min-width: 300px;
  padding: 15px;
  left: -170px;
}

#auth-dropdown .help-block{
  font-size:12px
}

#auth-dropdown .bottom{
  border-top:1px solid #ddd;
  padding:10px;
}

#auth-dropdown .bottom .bottom-text{
  padding: 0;
  display: inline;
  font-weight: 300;
  color: #979797;
}

#auth-dropdown .form-group {
  margin-bottom: 10px;
}

.auth-widget-bottom {
  font-size: 14px;
}
</style>
