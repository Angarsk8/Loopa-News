<template>
  <form class="form" role="form" accept-charset="UTF-8" id="signup-nav">
    <div class="form-group">
      <label class="sr-only" for="email-address">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email-address"
        placeholder="Email address"
        required
      />
    </div>
    <div class="form-group">
      <label class="sr-only" for="password-value">Password</label>
      <input
        type="password"
        class="form-control"
        id="password-value"
        placeholder="Password"
        required
      />
      </div>
    </div>
    <div class="form-group">
      <label class="sr-only" for="confirm-password-value">Confirm password</label>
      <input
        type="password"
        class="form-control"
        id="confirm-password-value"
        placeholder="Confirm password"
        required
      />
      </div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign up</button>
    </div>
  </form>
</template>
<script>
export default {
  name: "SignupForm"
}
</script>
