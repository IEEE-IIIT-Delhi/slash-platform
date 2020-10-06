<script context="module">
  export async function preload (page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, '/')
      return
    }
  }
</script>

