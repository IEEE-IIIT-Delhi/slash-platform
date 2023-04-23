<script context="module">
  export async function preload(page, session) {
    if (!session.user) {
      this.redirect(302, "/register");
      return;
    }

    if (session.user.disqualified) {
      this.redirect(302, "/auth/logout");
      return;
    }

    if (session.user.admin) {
      this.redirect(302, "/admin");
      return;
    }

    const { username, level } = session.user;
    const {
      data: { config },
    } = await this.fetch("/api/get-config").then((res) => res.json());

    if (!config.started) {
      return { config, username };
    }

    const {
      data: { win, question, img },
    } = await this.fetch("/api/get-question").then((res) => res.json());
    const {
      data: { rank },
    } = await this.fetch("/api/get-player-rank").then((res) => res.json());

    return { config, username, level, win, question, img, rank };
  }
</script>

<script>
  import Nav from "../components/play/Navigation.svelte";
  import SidePanel from "../components/play/SidePanel.svelte";
  import Footer from "../components/play/Footer.svelte";
  import GameArea from "../components/play/GameArea.svelte";

  export let config;
  export let username;
  export let level = 0;
  export let win = false;
  export let rank = 0;
  export let question;
  export let img;

  let innerWidth;

  if (!config.started) {
    level = rank = "--";
  }
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  {#if config.started}
    <title>Level {level} // Enigma</title>
  {/if}
</svelte:head>

<main>
  {@html '<!--level 4: marianrejewski1932@gmail.com-->'}
  {#if innerWidth > 800}
    <SidePanel {username} {level} {rank} />
  {/if}

  <section id="content">
    <Nav />

    <GameArea {win} {question} {img} {rank} {config} />

    {#if innerWidth <= 800}
      <Footer {username} {level} {rank} />
    {/if}
  </section>
</main>

<style lang="scss">
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
