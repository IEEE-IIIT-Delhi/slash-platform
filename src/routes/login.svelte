<script context="module">
  export async function preload (page, session) {
    if (session.user) {
      this.redirect(302, '/')
      return
    }
  }
</script>

<script>
  import { slide } from 'svelte/transition'
  import { stores } from '@sapper/app'
  import { wait } from '../utils'

  const { session } = stores()

  let response
  let loading

  async function login (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formDataJson = JSON.stringify(Object.fromEntries(formData))

    loading = true

    response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formDataJson
    }).then(res => res.json())

    loading = false

    if (response.success) {
      await wait(500)
      window.location.reload()
    }
  }
</script>

<main>
  <section>
    <h1>Login</h1>
    <p>Login or <a href="/register">Register</a> to start playing.</p>
    <form on:submit={login} method='POST'>
      {#if response}
        <p
          transition:slide={{ duration: 200 }}
          class='message'
          class:error={!response.success}
        >
          {response.message}
        </p>
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
        <button>
          {#if loading}
            <img src="/loading.svg" alt="">
          {:else}
            Enter
          {/if}
        </button>
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
