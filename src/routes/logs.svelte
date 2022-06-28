<script context="module">
  export async function preload(page, session) {
    if (!session.user) {
      this.redirect(302, "/");
      return;
    }

    const { data } = await this.fetch("/api/get-logs").then((res) =>
      res.json()
    );
    return { data };
  }
</script>

<script>
  import { onMount } from "svelte";
  export let data;
  let checked = true;

  async function refresh() {
    ({ data } = await fetch("/api/get-logs").then((res) => res.json()));
  }

  onMount(() => {
    window.setInterval(refresh, 3000);
  });
</script>

<svelte:head>
  <title>Logs // {"<back\\slash>"}</title>
</svelte:head>

<main>
  <section>
    <h1>Logs</h1>
    <p class="general">
      Showing 100 latest log entries. Refreshes every three seconds.
    </p>

    <label>
      <input type="checkbox" bind:checked />
      Show timestamp
    </label>

    <div class="logger">
      {#each data.logs as log}
        <code>
          <span class="time">{checked ? new Date(log.time).getTime() : ""}</span
          >
          <span class="type {log.type}">[{log.type}]</span>
          {log.key}:
          {log.value}
        </code>
      {/each}
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
    }

    label {
      margin-top: 20px;
      display: block;
      font-size: 14px;
    }

    .logger {
      background: #000;
      margin-top: 2.5vh;
      padding: 5px 10px;
      border-radius: 5px;
      max-height: 600px;
      overflow: auto;

      code {
        margin: 5px 0;
        font-size: 12px;
        white-space: nowrap;
        display: block;

        .time {
          color: #666;
        }

        .type {
          font-weight: bold;

          &.AUTH {
            color: #80deea;
          }

          &.CACHE {
            color: #ffeb3b;
          }

          &.ADMIN {
            color: #f44336;
          }

          &.ANSWER {
            color: #8bc34a;
          }
        }
      }
    }
  }
</style>
