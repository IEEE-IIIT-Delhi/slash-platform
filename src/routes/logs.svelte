<script context="module">
  export async function preload (page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, '/')
      return
    }

    const { data } = await this.fetch('/api/get-logs').then(res => res.json())
    return { data }
  }
</script>

<script>
  import { onMount } from 'svelte'
  export let data
  let checked = false

  async function refresh () {
    data = (await fetch('/api/get-logs').then(res => res.json())).data
  }

  onMount(() => {
    window.setInterval(refresh, 5000)
  })
</script>

<main>
  <section>
    <h1>Logs</h1>
    <p class='general'>Showing 100 latest log entries</p>

    <label>
      <input type='checkbox' bind:checked>
      Show timestamp
    </label>

    <div class='logger'>
      {#each data.logs as log}
        <p>{checked ? new Date(log.time).getTime() + ': ' : ''}[{log.type}] {log.key}: {log.value}</p>
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
      font-family: monospace;
      max-height: 500px;
      overflow: auto;

      p {
        margin: 5px 0;
        font-size: 14px;
      }
    }
  }
</style>
