<script>
  import { stores } from '@sapper/app'
  const { session } = stores()
</script>

<header>
  <nav>
    <a href="/">
      <img src="/logo.svg" alt="Slash logo">
    </a>

    <ul>
      {#if $session.user}
        <li><a href="/">Play</a></li>
      {/if}
      <li><a href="/leaderboard">Leaderboard</a></li>
      <li><a href="/telegram">Telegram</a></li>
      <li><a href="/home">Home</a></li>
      {#if $session.user}
        <li><a href="/auth/logout">Logout</a></li>
      {/if}
    </ul>
  </nav>
</header>

<style lang="scss">
  @import "../../styles/theme.scss";

  header {
    width: 100%;
  }

  nav {
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #1f2122;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 5px 10px -5px rgba(0,0,0,0.1);

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
  }
</style>
