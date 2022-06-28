<script context="module">
  export async function preload(page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, "/");
      return;
    }

    const {
      data: { config },
    } = await this.fetch("/api/get-config").then((res) => res.json());

    return { config, superadmin: session.user.superadmin };
  }
</script>

<script>
  import AdminForm from "../components/AdminForm.svelte";
  export let config;
  export let superadmin;
</script>

<svelte:head>
  <title>Admin // {"<back\\slash>"}</title>
</svelte:head>

<main>
  <section>
    <h1>Admin Panel</h1>

    <a href="/stats">View statistics</a>
    {#if superadmin} <a href="/logs">View logs</a> {/if}

    <div class="forms">
      <AdminForm
        heading="Add question"
        action="/api/add-question"
        buttonValue="Add"
      >
        <div class="input-grp">
          <label for="">Level</label>
          <input type="number" name="level" placeholder="Level" required />
        </div>
        <div class="input-grp">
          <label for="">Question</label>
          <textarea name="question" placeholder="Question text" required />
        </div>
        <div class="input-grp">
          <label for="">Image Link (Optional)</label>
          <textarea name="img" placeholder="Image Link" />
        </div>
        <div class="input-grp">
          <label for="">Answer</label>
          <input type="text" name="answer" placeholder="Answer" required />
        </div>
      </AdminForm>

      <AdminForm
        heading="Update question"
        action="/api/update-question"
        buttonValue="Update"
      >
        <div class="input-grp">
          <label for="">Level</label>
          <input type="number" name="level" placeholder="Level" required />
        </div>
        <div class="input-grp">
          <label for="">Question</label>
          <textarea name="question" placeholder="Question text" required />
        </div>
        <div class="input-grp">
          <label for="">Image Link (Optional)</label>
          <textarea name="img" placeholder="Image Link" />
        </div>
        <div class="input-grp">
          <label for="">Answer</label>
          <input type="text" name="answer" placeholder="Answer" required />
        </div>
      </AdminForm>

      <AdminForm
        heading="Get question details"
        action="/api/get-question"
        buttonValue="Get"
        displayResponse={true}
        displayResponseFormatter={({ question }) => [
          ["Level", question.level],
          ["Question", question.question],
          ["Image", question.img],
        ]}
      >
        <div class="input-grp">
          <label for="">Level</label>
          <input type="number" name="level" placeholder="Level" required />
        </div>
      </AdminForm>

      <AdminForm
        heading="Get player details"
        action="/api/get-player-details"
        buttonValue="Get"
        displayResponse={true}
        displayResponseFormatter={({ player }) => [
          ["Player", player.username],
          ["Name", player.name],
          ["Email", player.email],
          ["Level", player.level],
          ["Admin", player.admin ? "Yes" : "No"],
          ["Phantom", player.phantom ? "Yes" : "No"],
          ["Disqualified", player.disqualified ? "Yes" : "No"],
          ["Last level on", new Date(player.lastLevelOn).toLocaleString()],
          ["Registered on", new Date(player.registrationDate).toLocaleString()],
        ]}
      >
        <div class="input-grp">
          <label for="">Player username</label>
          <input type="text" name="username" placeholder="Username" required />
        </div>
      </AdminForm>

      <AdminForm
        heading="Update player level"
        action="/api/update-player-level"
        buttonValue="Update"
      >
        <div class="input-grp">
          <label for="">Player</label>
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div class="input-grp">
          <label for="">Level</label>
          <input type="number" name="newLevel" placeholder="Level" required />
        </div>
      </AdminForm>

      <AdminForm
        heading="Update player type"
        action="/api/update-player-type"
        buttonValue="Update"
      >
        <div class="input-grp">
          <label for="">Username</label>
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div class="input-grp">
          <label for="">Select type</label>
          <select name="type" required>
            <option value="disqualified">Disqualified</option>
            <option value="phantom">Phantom</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="input-grp">
          <label for="">Set value</label>
          <div class="radio">
            <label>
              <input type="radio" name="value" value="1" required />
              True
            </label>
            <label>
              <input type="radio" name="value" value="0" required />
              False
            </label>
          </div>
        </div>
      </AdminForm>

      <AdminForm
        heading="Clear cache"
        action="/api/clear-cache"
        buttonValue="Clear"
      >
        <p class="general">Leave key field empty to flush all cache.</p>
        <div class="input-grp">
          <label for="">Cache key</label>
          <input type="text" name="key" placeholder="Cache key" />
        </div>
      </AdminForm>
    </div>

    <form class="danger" action="/api/update-config" method="POST">
      {#if !config.started}
        <input name="action" type="hidden" value="begin" />
        <button class="green">Begin Hunt</button>
      {/if}

      {#if config.started && !config.ended}
        <input name="action" type="hidden" value="end" />
        <button class="red">End Hunt</button>
      {/if}
    </form>

    <form class="danger" action="/api/update-config" method="POST">
      {#if config.showLeaderboard}
        <input name="action" type="hidden" value="hide-leaderboard" />
        <button class="red">Hide leaderboard</button>
      {:else}
        <input name="action" type="hidden" value="show-leaderboard" />
        <button class="green">Show leaderboard</button>
      {/if}
    </form>
  </section>
</main>

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    justify-content: center;
  }

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

    a {
      color: #fff;
      background: #1f2122;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      margin: 1vh 10px 1vh 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    }

    .danger {
      margin: 2vh 0;
      display: inline-block;

      button {
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        display: inline-block;
        margin-right: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
        font-family: Inter;
        border: none;
        font-size: 16px;
        cursor: pointer;

        &.green {
          background: #304f30;
        }

        &.red {
          background: #6d3434;
        }
      }
    }

    .forms {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -20px;
    }
  }
</style>
