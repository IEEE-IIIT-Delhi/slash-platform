<script context="module">
  export async function preload (page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, '/')
      return
    }

    const { data } = await this.fetch('/api/get-stats').then(res => res.json())
    return { data }
  }
</script>

<script>
  import { format } from 'timeago.js'
  export let data
</script>

<main>
  <section>
    <h1>Stats</h1>
    <div class="gallery">
      <div class="card">
        <span class="number">{data.answerAttempts}</span>
        <p class='label'>Answer attempts</p>
      </div>

      <div class="card">
        <p class='label'>Players per level</p>
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Players</th>
            </tr>
          </thead>
          {#each data.playersPerLevel as count, level}
            <tr>
              <td>{level}</td>
              <td>{count}</td>
            </tr>
          {/each}
        </table>
      </div>

      <div class="card">
        <span class="number">{data.playerCount}</span>
        <p class='label'>Players</p>
      </div>

      <div class="card">
        <span class="number">{data.adminCount}</span>
        <p class='label'>Admins</p>
      </div>

      <div class="card">
        <span class="number">{data.geo.countries.length}</span>
        <p class='label'>Countries</p>
        <div class="tags-container">
          <div class="tags">
            {#each data.geo.countries as tag}
              <span class='tag'>{tag}</span>
            {/each}
          </div>
        </div>
      </div>

      <div class="card">
        <span class="number">{data.geo.cities.length}</span>
        <p class='label'>Cities</p>
        <div class="tags-container">
          <div class="tags">
            {#each data.geo.cities as tag}
              <span class='tag'>{tag}</span>
            {/each}
          </div>
        </div>
      </div>

      <div class="card">
        <p class='label'>Last 10 registrants</p>
        <table>
          {#each data.lastTenRegistrants as entry}
            <tr>
              <td>{entry.username}</td>
              <td>{format(entry.time)}</td>
            </tr>
          {/each}
        </table>
      </div>
    </div>
  </section>
</main>

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  section {
    width: 85%;
    max-width: 600px;
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

    .gallery {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
    }

    .card {
      background: #1f2122;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, .12);
      flex: 1;
      min-width: 250px;
      margin: 10px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span.number {
        font-size: 72px;
        font-weight: 600;
        margin-bottom: 10px;
        display: block;
      }

      table {
        width: 100%;
        margin: 10px 0 0 0;

        td {
          padding: 5px 0;
        }
      }

      .tags-container {
        flex: 1;
      }

      .tags {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        max-height: 200px;
        overflow: auto;

        &::-webkit-scrollbar {
          background: #0000;
          width: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background: #181a1b;
          border-radius: 10px;
        }

        .tag {
          margin: 5px;
          background: #461f26;
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      }
    }

    p {
      font-size: 18px;
      color: #828282;
      line-height: 1.7;
    }
  }
</style>
