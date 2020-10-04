<script context='module'>
  export async function preload (page, session) {
    const res = await this.fetch('/api/get-leaderboard')
    const { data: { leaderboard } } = await res.json()
    return { leaderboard }
  }
</script>

<script>
  export let leaderboard
  console.log(leaderboard)
</script>
