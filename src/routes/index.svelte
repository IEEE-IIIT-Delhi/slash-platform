<script context="module">
  export async function preload (page, session) {
    if (!session.user) {
      this.redirect(302, '/login')
      return
    }

    const { username, level } = session.user
    const { data: { config }} = await this.fetch('/api/get-config').then(res => res.json())

    const { data: { win, question }} = await this.fetch('/api/get-question').then(res => res.json())
    const { data: { rank }} = await this.fetch('/api/get-player-rank').then(res => res.json())

    return { username, level, config, win, question, rank }
  }
</script>

<script>
  import Nav from '../components/nav-play.svelte'
  import PlaySide from '../components/play-side.svelte'
  import PlayFooter from '../components/play-footer.svelte'
  import PlayArea from '../components/play-area.svelte'

  export let username
  export let level
  export let win
  export let question
  export let rank
  export let config

  let innerWidth

  if (!config.started) {
    level = rank = '--'
  }
</script>

<svelte:window bind:innerWidth />

<main>
  {#if innerWidth > 800}
    <PlaySide {username} {level} {rank}/>
  {/if}

  <section id='content'>
    <Nav />

    <PlayArea {win} {question} {rank} {config} />

    {#if innerWidth <= 800}
      <PlayFooter {username} {level} {rank}/>
    {/if}
  </section>
</main>

<style lang='scss'>
  main {
    display: flex;
    flex: 1;
  }

  section#content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>
