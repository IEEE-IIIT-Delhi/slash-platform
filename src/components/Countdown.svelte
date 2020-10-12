<script>
  import { onMount } from 'svelte'
  export let date

  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0

  const endTime = new Date(date).getTime()
  const hourSeconds = 60 * 60
  const daySeconds = 24 * hourSeconds

  function updateTimer () {
    const nowTime = Date.now()
    let duration = (endTime - nowTime) / 1000

    if (duration < 0) {
      window.location.reload()
      return
    }

    days = Math.floor(duration / daySeconds)
    duration -= days * daySeconds

    hours = Math.floor(duration / hourSeconds)
    duration -= hours * hourSeconds

    minutes = Math.floor(duration / 60)
    duration -= minutes * 60

    seconds = Math.floor(duration)
  }

  onMount(() => {
    window.setInterval(updateTimer, 1000)
  })
</script>

<div class="countdown">
  <span class='number'>{days}</span>
  <span class='label'>d</span>

  <span class='number'>{hours < 10 ? "0" + hours : hours}</span>
  <span class='label'>h</span>

  <span class='number'>{minutes < 10 ? "0" + minutes : minutes}</span>
  <span class='label'>m</span>

  <span class='number'>{seconds < 10 ? "0" + seconds : seconds}</span>
  <span class='label'>s</span>
</div>

<style>
  .countdown {
    margin: 2.5vh 0;
  }

  .number {
    font-size: 42px;
    font-weight: 600;
    color: #ddd;
  }

  .label {
    font-size: 16px;
    font-weight: 300;
    color: #bbb;
    margin: 0 10px 0 5px;
  }
</style>
