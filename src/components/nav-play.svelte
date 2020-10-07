<script>
  import { slide } from 'svelte/transition'
  import Chevron from './chevron.svelte'

  let showMenu = false

  const toggleMenu = () => showMenu = !showMenu
</script>

<header>
  <nav>
    <a class='header' href="/">
      <img src="/logo.svg" alt="Slash logo">
    </a>

    <!-- Desktop view -->
    <ul class='main-list'>
      <li><a href="/leaderboard">Leaderboard</a></li>
      <li><a href="https://discord.gg/ZfU5xE3" target="_blank" rel="noopener">Discord</a></li>
      <li><a href="https://slash.win" target="_blank" rel="noopener">Home</a></li>
      <li><a href="/auth/logout">Logout</a></li>
    </ul>

    <!-- Mobile view -->
    <button
      class="menu-btn"
      role="button"
      aria-label="Toggle menu"
      on:click={toggleMenu}
    >
      <Chevron strokeColor={'#ff3458d1'} open={showMenu}/>
    </button>

    {#if showMenu}
      <ul class='hidden-list' transition:slide={{ duration: 200 }}>
        <li><a on:click={toggleMenu} href="/leaderboard">Leaderboard</a></li>
        <li><a href="https://discord.gg/ZfU5xE3" target="_blank" rel="noopener">Discord</a></li>
        <li><a href="https://slash.win" target="_blank" rel="noopener">Home</a></li>
        <li><a href="/auth/logout">Logout</a></li>
      </ul>
    {/if}
  </nav>
</header>

<style lang="scss">
  @import "../../styles/theme.scss";

  header {
    width: 100%;
    position: absolute;
    top: 0;
    background: #1f2122;
  }

  nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: center;
    padding: 20px;
    box-shadow: 0 5px 10px -5px rgba(0,0,0,0.2);

    img {
      height: 30px;
    }
  }

  .header {
    display: none;
  }

  ul {
    display: flex;

    li {
      list-style-type: none;
      margin: 0 20px;
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
    ul.hidden-list,
    .header {
      display: flex;
    }

    nav {
      justify-content: space-between;
    }

    ul.main-list {
      display: none;
    }
  }
</style>
