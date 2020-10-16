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
  const { session } = stores()

  let response
  let loading
  let username = ''
  $: username = username.replace(/[\W]+/g, '').slice(0, 15)

  async function register (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formDataJson = JSON.stringify(Object.fromEntries(formData))

    loading = true

    response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formDataJson
    }).then(res => res.json())

    loading = false

    if (response.success) {
      await new Promise(r => setTimeout(r, 500))
      window.location.reload()
    }
  }
</script>

<main>
  <section>
    <h1>Register</h1>
    <p>Create an account to start playing. <a href="/login">Login</a> if you already have.</p>
    <form on:submit={register} method='POST'>
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
        <label for='username'>Username (2 to 15 characters, alphanumeric/underscore)</label>
        <input bind:value={username} type='text' name='username' placeholder='Username' required>
      </div>
      <div class='input-grp'>
        <label for='name'>Name</label>
        <input type='text' name='name' placeholder='Name' required>
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
        <button>
          {#if loading}
            <img src="/loading.svg" alt="">
          {:else}
            Register
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
