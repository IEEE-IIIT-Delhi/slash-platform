<script context="module">
  export async function preload (page, session) {
    if (!session.user) {
      this.redirect(302, '/login')
      return
    }

    const { username, level } = session.user
    const { data: { question }} = await this.fetch('/api/get-question').then(res => res.json())
    const { data: { rank }} = await this.fetch('/api/get-player-rank').then(res => res.json())

    return { username, level, question, rank }
  }
</script>

<script>
  export let username
  export let level
  export let question
  export let rank
</script>
