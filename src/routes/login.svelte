<script context="module">
  export async function preload(page, session) {
    if (session.user) {
      this.redirect(302, "/");
      return;
    }
  }
</script>

<script>
  import { slide } from "svelte/transition";

  let response;
  let loading;

  async function login(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJson = JSON.stringify(Object.fromEntries(formData));

    loading = true;

    response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJson,
    }).then((res) => res.json());

    loading = false;

    if (response.success) {
      await new Promise((r) => setTimeout(r, 500));
      window.location.reload();
    }
  }
</script>

<svelte:head>
  <title>Login // Enigma</title>
</svelte:head>

<main>
  <section>
    <h1>Login</h1>
    <p>Are you ready for a adrenaline-pumping race through the world of mysteries and enigmas? Iliad is an online hunt that takes you on a journey through the internet and beyond with fuzzling challenges, bewildering mysteries, and conundrums to be solved. Solve cryptic messages, find signs hidden in plain sight and bring out the pattern-seeker inside you to climb up the leaderboard and win.</p>
    
    <form on:submit={login} method="POST">
      {#if response}
        <p
          transition:slide={{ duration: 200 }}
          class="message"
          class:error={!response.success}
        >
          {response.message}
        </p>
      {/if}
      <div class="input-grp">
        <label for="username">Username</label>
        <input type="text" name="username" placeholder="Username" required />
      </div>
      <div class="input-grp">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="input-grp">
        <button>
          {#if loading}
            <img src="/loading.svg" alt="" />
          {:else}
            Enter
          {/if}
        </button>
      </div>
    </form>
    <p>Login or <a href="/register">Register</a> to start playing.</p>
  </section>
</main>

<style lang="scss">
  @import "../../styles/auth-forms.scss";

  main {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  form {
  padding: 5px 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 400px;
  margin: 2vh auto;
  background: #1f2122;
  }
</style>
