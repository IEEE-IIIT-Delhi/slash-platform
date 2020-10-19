<script>
  import Countdown from '../Countdown.svelte'
  import QuestionAnswer from './QuestionAnswer.svelte'

  export let win
  export let question
  export let rank
  export let config
</script>

<section id='play-area'>
  <div class="container">
    {#if !config.started}
      <h1>Hang tight!</h1>
      <p class='general'>Slash will begin in</p>
      <Countdown date={config.startDate} />
      <p class='general'>Till then, join our
        <a href="https://discord.gg/ZfU5xE3">Discord server</a>
        or visit <a href="https://elysium.iiitd.edu.in">Elysium '20</a>.
      </p>

    {:else if win}
      <h1>Congratulations!</h1>
      <p class='general'>You have successfully completed Slash with a rank of <span class='rank'>{rank}</span>!</p>
      <p class='general'>Go the <a href="/leaderboard">leaderboard</a> to check the standings.</p>

    {:else if config.ended}
      <h1>The End!</h1>
      <p class='general'>Slash has come to an end! You have finished with a rank of <span class='rank'>{rank}</span>.</p>
      <p class='general'>Go the <a href="/leaderboard">leaderboard</a> to check the standings.</p>

    {:else}
      <h1>Question</h1>
      <QuestionAnswer {question} />

    {/if}
  </div>
</section>

<style lang='scss'>
  section#play-area {
    flex: 1;

    .container {
      width: 85%;
      max-width: 600px;
      margin: 15vh auto 50px;
    }

    h1 {
      margin-bottom: 2vh;
      font-size: 36px;
      display: flex;
      align-items: flex-end;
      font-weight: 100;

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
      margin: 10px 0;

      a {
        color: #bbb;
      }
    }

    span.rank {
      font-weight: bold;
      font-size: 20px;
      color: #bbb;
    }
  }
</style>
