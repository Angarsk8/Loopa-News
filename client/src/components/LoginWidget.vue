<template>
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a
        href="#"
        class="dropdown-toggle"
        data-toggle="dropdown"
      >
        Login<span class="caret"></span>
      </a>
      <ul id="login-dp" class="dropdown-menu">
        <li>
          <div class="row">
            <div class="col-md-12">
              <login-form v-if="isLogin"></login-form>
              <signup-form v-else></signup-form>
              <div v-if="isLogin" class="bottom text-center">
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
import LoginForm  from './LoginForm'
import SignupForm from './SignupForm'

export default {
  name: 'LoginWidget',
  components: {
    'login-form': LoginForm,
    'signup-form': SignupForm,
  },
  data: () => {
    return {
      isLogin: true
    }
  },
  methods: {
    toggleLogin(e){
      e.stopPropagation();
      this.isLogin = !this.isLogin;
    }
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
#login-dp .form-group button {
  width: 90%;
  margin: auto 5%;
}
</style>
