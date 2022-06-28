<script>
  export let username;
  export let level;
  export let rank;
</script>

<footer>
  <h2 class="level">Level <span>{15 - level}</span></h2>
  <h3><span>{username}</span></h3>
  <h3>Rank: <span>{String(rank).padStart(3, '0')}</span></h3>
</footer>

<style lang="scss">
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.12);
    background: #111;
    padding: 10px 20px;

    h2.level {
      font-size: 22px;
      font-weight: 100;

      span {
        font-weight: 900;
      }
    }

    h3 {
      margin: 20px 0;
      font-size: 14px;
      font-weight: 100;

      span {
        font-size: 16px;
        font-weight: 400;
        word-break: break-all;
      }
    }
  }
</style>
