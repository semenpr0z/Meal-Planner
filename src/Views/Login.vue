<script>
  import Navbar from '@/components/navbar.vue';
  import NavbarFooterMobile from '@/components/navbar-footer-mobile.vue';
  import LoginForm from '@/components/Login-form.vue';
  import RegistrationForm from '@/components/Registration-form.vue';

export default {
    data() {
    return {
      loginFormVisible: true,
      registrationFormVisible: false
    };
  },
  components: {
    Navbar,
    NavbarFooterMobile,
    LoginForm,
    RegistrationForm
  },
  methods: {
    showRegistration() {
      this.loginFormVisible = false,
      this.registrationFormVisible = true
    },
    showLogin() {
      this.loginFormVisible = true,
      this.registrationFormVisible = false
    }
  }
}

</script>

<template>
<Navbar></Navbar>
<main class="main">
  <LoginForm 
  v-if="loginFormVisible"
  @showRegistration="showRegistration"/>
  <RegistrationForm 
  v-if="registrationFormVisible"
  @showLogin="showLogin"
  />
</main>
<NavbarFooterMobile></NavbarFooterMobile>

</template>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

</style>