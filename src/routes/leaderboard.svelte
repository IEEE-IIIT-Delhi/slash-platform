<script context='module'>
  export async function preload (page, session) {
    const { data: { config }} = await this.fetch('/api/get-config').then(res => res.json())
    if (!config.started) {
      return { leaderboard: null }
    }

    const res = await this.fetch('/api/get-leaderboard')
    const { data: { leaderboard } } = await res.json()
    return { leaderboard }
  }
</script>

<script>
  import Nav from '../components/nav-generic.svelte'
  export let leaderboard
</script>

<Nav />

<section>
  <h1>Leaderboard</h1>

  {#if leaderboard}
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {#each leaderboard as entry, i}
        <tr>
          <td class='center'>{i + 1}</td>
          <td>{entry.username}</td>
          <td class='center'>{entry.level}</td>
        </tr>
        {/each}
      </tbody>
    </table>

  {:else}
    <p class='general'>The leaderboard will activate once Slash begins.</p>
    <p class='general'>Till then, join our
      <a href="https://discord.gg/ZfU5xE3">Discord server</a>
      or visit <a href="https://elysium.iiitd.edu.in">Elysium '20</a>.
    </p>

  {/if}
</section>

<style lang="scss">
  section {
    width: 90%;
    max-width: 800px;
    margin: 15vh auto 50px;

    h1 {
      margin-bottom: 2vh;
      font-size: 36px;
      display: flex;
      align-items: flex-end;

      &:after {
        content: '';
        flex: 1;
        height: 5px;
        margin: 0 0 10px 20px;
        background: #461f26;
      }
    }

    p.general {
      font-size: 18px;
      color: #828282;
      line-height: 1.7;
      margin: 10px 0;

      a {
        color: #bbb;
      }
    }
  }

  table {
    width: 100%;
    align-self: center;
    border-collapse: separate;
    border-spacing: 3px 2px;
    position: relative;
    text-transform: none;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 10px;

    thead {
      color: #bdbdbd;
      font-size: 16px;

      th {
        border-radius: 5px;
        padding: 8px 15px;
        background: #162530;
        border: 1px solid #bdbdbd1a;
      }
    }

    tbody {
      tr:nth-child(2n) {
        background: #162530;
      }

      td {
        border-radius: 5px;
        font-size: 15px;
        padding: 10px;

        &.center {
          text-align: center;
        }
      }

      th, td {
        white-space: nowrap;
      }
    }
  }
</style>
