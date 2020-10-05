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
    <h1>Login</h1>
    <p>Login or <a href="/register">Register</a> to start playing.</p>
    <form action='/auth/login' method='POST'>
      {#if $session.message}
        <p class='message' class:error={$session.error}>{$session.message}</p>
      {/if}
      <div class='input-grp'>
        <label for='username'>Username</label>
        <input type='text' name='username' placeholder='Username' required>
      </div>
      <div class='input-grp'>
        <label for='password'>Password</label>
        <input type='password' name='password' placeholder='Password' required>
      </div>
      <div class="input-grp">
        <input type='submit' value='Enter'>
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
