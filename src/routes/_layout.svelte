<script>
  import { stores } from "@sapper/app"
  import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte"

  const { preloading } = stores()
</script>

<PageLoadingBar {preloading} color1="#ff3458d1" color2="#461f26"/>

<slot />

<style lang="scss" global>
  @import "../../styles/global.scss";
</style>
