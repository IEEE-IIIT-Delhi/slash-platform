<script context="module">
  export async function preload (page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, '/')
      return
    }
  }
</script>

<script>
  import Nav from '../components/nav-generic.svelte'
</script>

<Nav />

<main>
  <section>
    <h1>Admin Panel</h1>
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

    p {
      font-size: 18px;
      color: #828282;
      line-height: 1.7;
    }
  }
</style>
