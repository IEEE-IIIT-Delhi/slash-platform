<script context="module">
  export async function preload (page, session) {
    if (session.user) {
      this.redirect(302, '/')
      return
    }
  }
</script>

<script>
  import Nav from '../components/nav-generic.svelte'
  import { stores } from '@sapper/app'
  const { session } = stores()
</script>

<Nav />

<main>
  <section>
    <h1>Register</h1>
    <p>Create an account to start playing. <a href="/login">Login</a> if you already have.</p>
    <form action='/auth/register' method='POST'>
      {#if $session.error}
        <p class="message error">{$session.message}</p>
      {/if}
      <div class='input-grp'>
        <label for='username'>Username</label>
        <input type='text' name='username' placeholder='Username' required>
      </div>
      <div class='input-grp'>
        <label for='name'>Full name</label>
        <input type='text' name='name' placeholder='Full name' required>
      </div>
      <div class='input-grp'>
        <label for='email'>Email</label>
        <input type='email' name='email' placeholder='Email' required>
      </div>
      <div class='input-grp'>
        <label for='password'>Password</label>
        <input type='password' name='password' placeholder='Password' required>
      </div>
      <div class="input-grp">
        <input type='submit' value='Register'>
      </div>
    </form>
  </section>
</main>

<style lang="scss">
  @import "../../styles/auth-forms.scss";

  main {
    flex: 1;
    display: flex;
    justify-content: center;
  }
</style>
