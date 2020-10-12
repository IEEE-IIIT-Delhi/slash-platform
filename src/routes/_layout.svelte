<script>
  import { stores } from "@sapper/app"
  import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte"
  import Nav from '../components/Navigation.svelte'

  export let segment

  const { preloading, session } = stores()
</script>

<svelte:head>
  {#if !$session.user || !$session.user.admin}
    <script>window.sa_event=window.sa_event||function(){a=[].slice.call(arguments);sa_event.q?sa_event.q.push(a):sa_event.q=[a]};</script>
    <script data-skip-dnt="true" async defer src="https://sa.mihir.ch/latest.js"></script>
  {/if}
</svelte:head>

<PageLoadingBar {preloading} color1="#ff3458d1" color2="#461f26"/>

{#if segment}
  <Nav />
{/if}

<slot />

<style lang="scss" global>
  @import "../../styles/global.scss";
</style>
