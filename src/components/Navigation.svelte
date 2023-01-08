<script>
  import { stores } from "@sapper/app";
  import { slide } from "svelte/transition";
  import Chevron from "./Chevron.svelte";

  const { session } = stores();
  let showMenu = false;

  const toggleMenu = () => (showMenu = !showMenu);
</script>

<header>
  <nav>
    <a href="/">
      <img src="/Illiad logo.png" alt="Slash logo" />
    </a>

    <!-- Desktop view -->
    <ul class="main-list">
      {#if $session.user}
        <li><a href="/">{$session.user.admin ? "Admin" : "Play"}</a></li>
      {/if}

      <li><a href="/leaderboard">Leaderboard</a></li>
      <li>
        <a href="https://discord.gg/TCxtrEeRhR" target="_blank" rel="noopener"
          >Discord</a
        >
      </li>

      {#if $session.user}
        <li><a href="/auth/logout">Logout</a></li>
      {:else}
        <li><a href="/login">Login</a></li>
      {/if}
    </ul>

    <!-- Mobile view -->
    <button
      class="menu-btn"
      role="button"
      aria-label="Toggle menu"
      on:click={toggleMenu}
    >
      <Chevron strokeColor={"#ff3458d1"} open={showMenu} />
    </button>

    {#if showMenu}
      <ul class="hidden-list" transition:slide={{ duration: 200 }}>
        {#if $session.user}
          <li>
            <a on:click={toggleMenu} href="/"
              >{$session.user.admin ? "Admin" : "Play"}</a
            >
          </li>
        {/if}

        <li><a on:click={toggleMenu} href="/leaderboard">Leaderboard</a></li>
        <li>
          <a href="https://discord.gg/TCxtrEeRhR" target="_blank" rel="noopener"
            >Discord</a
          >
        </li>
        <li>
          <a href="https://slash.win" target="_blank" rel="noopener">Home</a>
        </li>

        {#if $session.user}
          <li><a href="/auth/logout">Logout</a></li>
        {:else}
          <li><a href="/login">Login</a></li>
        {/if}
      </ul>
    {/if}
  </nav>
</header>

<style lang="scss">
  @import "../../styles/theme.scss";

  header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  nav {
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 20px;
    background: #1f2122;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.2);

    @media (max-width: 800px) {
      border-radius: 0;
    }

    img {
      height: 30px;
    }
  }

  ul {
    display: flex;

    li {
      list-style-type: none;
      margin: 0 10px;
    }

    a {
      color: $color-text;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    &.hidden-list {
      width: 100%;
      flex-direction: column;
      margin-top: 10px;
      display: none;

      li {
        padding: 10px;
        text-align: center;
        margin: 10px 0;
        background: #181a1b;
        border-radius: 5px;

        a {
          display: block;
        }
      }
    }
  }

  button.menu-btn {
    display: none;
    border: 1px solid transparent;
    border-radius: 5px;
    margin-right: 15px;
    padding: 5px;
    background: none;
    height: fit-content;
    cursor: pointer;
    outline: none;

    &:focus {
      border-color: #ff3458d1;
    }
  }

  @media only screen and (max-width: 800px) {
    button.menu-btn,
    ul.hidden-list {
      display: flex;
    }

    ul.main-list {
      display: none;
    }
  }
</style>
