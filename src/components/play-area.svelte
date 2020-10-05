<script>
  import Countdown from '../components/countdown.svelte'

  export let win
  export let question
  export let rank
  export let config

  let answer = ''
  $: answer = answer.replace(/[\W_]+/g, '').toLowerCase()

  async function checkAnswer (event) {
    event.preventDefault()

    const res = await fetch('/api/check-answer', {
      method: 'POST',
      body: JSON.stringify({ answer }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { success } = await res.json()

    if (success) {
      window.location.reload()
    }
  }
</script>

<section id='play-area'>
  <div class="container">
    {#if !config.started}
      <h1>Hang tight!</h1>
      <p class='general'>Slash will begin in</p>
      <Countdown date={config.startDate} />
      <p class='general'>Till then, join our
        <a href="https://discord.gg/5wqhZu">Discord server</a>
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
      <p class='question-text'>{question}</p>

      <form on:submit={checkAnswer} method='POST'>
        <input
          type='text'
          name='answer'
          placeholder='Answer'
          bind:value={answer}
          required
        >
        <input type='submit' value='Submit'>
      </form>
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

    p.question-text {
      font-size: 18px;
      line-height: 1.5;
      font-weight: 300;
      margin: 30px 0;
    }

    form {
      margin-top: 5vh;
      display: flex;

      input {
        background: #1f2122;
        border-radius: 5px;
        border: 1px solid #ffffff0f;
        padding: 10px;
        font-family: Inter, sans-serif;
        font-size: 18px;
        color: #bbb;
        transition: all .1s linear;

        &[type='text'] {
          margin-right: 20px;
          flex: 1;
        }

        &[type='submit'] {
          width: fit-content;
          cursor: pointer;
          background: linear-gradient(90deg, #1c5fa2, #3e55a9);
          color: #fff;
          font-weight: 300;
          align-self: center;
        }

        &:focus,
        &:active {
          border-color: #ffffff29;
          outline: none;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
        }

        &:hover {
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
        }
      }
    }
  }
</style>
