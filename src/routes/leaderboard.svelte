<script context="module">
  export async function preload(page, session) {
    const {
      data: { config },
    } = await this.fetch("/api/get-config").then((res) => res.json());
    if (!config.showLeaderboard && !(session.user && session.user.admin)) {
      return { leaderboard: [], config };
    }

    const res = await this.fetch("/api/get-leaderboard");
    const {
      data: { leaderboard },
    } = await res.json();
    return { leaderboard, config };
  }
</script>

<script>
  import { MAX_LEADERBOARD_PLAYERS } from "../constants";
  import { stores } from "@sapper/app";

  export let leaderboard;
  export let config;

  const { session } = stores();
  const { user } = $session;
  const isAdmin = user && user.admin;
</script>

<svelte:head>
  <title>Leaderboard // Slash</title>
</svelte:head>

<section>
  <h1>Leaderboard</h1>

  {#if config.showLeaderboard || isAdmin}
    {#if !config.ended && !isAdmin}
      <p class="general">
        The leaderboard is displaying only the top {MAX_LEADERBOARD_PLAYERS} players.
      </p>
    {/if}

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
          {#if entry}
            <tr>
              <td>{i + 1}</td>
              <td>{entry.username}</td>
              <td>{entry.level}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="general">
      The leaderboard will activate {config.started
        ? "soon"
        : "once Slash begins"}.
    </p>
    <p class="general">
      Till then, join our
      <a href="https://discord.gg/eV9yQ7Na">Discord server</a>.
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
        content: "";
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
        background: #111;
        border: 1px solid #000;
      }
    }

    tbody {
      tr:nth-child(2n) {
        background: #111;
      }

      td {
        border-radius: 5px;
        font-size: 15px;
        padding: 10px;
        text-align: center;
      }

      th,
      td {
        white-space: nowrap;
      }
    }
  }
</style>
