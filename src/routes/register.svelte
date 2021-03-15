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
        <label for='username'>Team name (2 to 25 characters, alphanumeric/underscore)</label>
        <input bind:value={username} type='text' name='username' placeholder='Team name' required>
      </div>
      <div class='input-grp'>
        <label for='password'>Password</label>
        <input type='password' name='password' id='password' placeholder='Password' required>
      </div>
      <div class='input-grp'>
        <label for='house'>House</label>
        <select name='house' id='house'>
          <option value='cepheus'>Cepheus</option>
          <option value='draco'>Draco</option>
          <option value='orion'>Orion</option>
          <option value='phoenix'>Phoenix</option>
        </select>
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
