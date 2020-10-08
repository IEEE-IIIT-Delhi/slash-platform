<script>
  export let username
  export let level
  export let rank
</script>

<aside>
  <a href="/">
    <img src="/logo.svg" alt="Slash logo">
  </a>
  <h1 class='level'>Level <span>{level}</span></h1>
  <div class="bottom">
    <h2>Player: <span>{username}</span></h2>
    <h2>Rank: <span>{rank}</span></h2>
  </div>
</aside>

<style lang='scss'>
  aside {
    background: #111;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 7.5vh 0 3vh;
    box-shadow: 5px 0 10px rgba(0,0,0,0.12);

    img {
      height: 50px;
    }

    h1.level {
      font-size: 36px;
      font-weight: 100;

      span {
        font-weight: 900;
      }
    }

    .bottom {
      width: 100%;
      padding: 0 20px 0 50px;

      h2 {
        margin: 20px 0;
        font-size: 16px;
        font-weight: 100;

        span {
          font-size: 20px;
          font-weight: 600;
          word-break: break-all;
        }
      }
    }
  }
</style>
