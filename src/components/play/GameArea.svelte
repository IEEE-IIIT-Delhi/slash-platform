<script>
  import { fade } from 'svelte/transition'
  import Countdown from '../../components/Countdown.svelte'

  export let win
  export let question
  export let rank
  export let config

  let loading = false
  let buttonText = 'Check'
  let answer = ''
  let wrongAnswer = false
  let rightAnswer = false

  $: answer = answer.replace(/[\W]+/g, '').toLowerCase()

  const wait = async (ms) => new Promise(r => setTimeout(r, ms))

  async function checkAnswer (event) {
    event.preventDefault()

    loading = true
    const res = await fetch('/api/check-answer', {
      method: 'POST',
      body: JSON.stringify({ answer }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { success } = await res.json()
    loading = false

    if (success) {
      rightAnswer = true
      buttonText = 'Correct!'

      await wait(1000)

      window.location.reload()
    } else {
      buttonText = 'Nope!'
      wrongAnswer = true

      await wait(1000)

      wrongAnswer = false
      buttonText = 'Check'
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
      <p class='question-text'>{question}</p>

      <form on:submit={checkAnswer} method='POST'>
        <div class="input-container">
          <input
            type='text'
            name='answer'
            placeholder='Answer'
            bind:value={answer}
            required
          >
        </div>
        <button class:wrongAnswer class:rightAnswer>
          {#if loading}
            <img src="/loading.svg" alt="">
          {:else}
            <span in:fade={{ duration: 200 }}>
              {buttonText}
            </span>
          {/if}
        </button>
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
        width: 100%;
      }

      .input-container {
        margin-right: 20px;
        flex: 1;
      }

      @media (max-width: 600px) {
        flex-direction: column;

        .input-container {
          margin-right: 0;
          margin-bottom: 4vh;
        }
      }

      input,
      button {
        background: #1f2122;
        border-radius: 5px;
        border: 1px solid #ffffff0f;
        padding: 10px;
        font-family: Inter, sans-serif;
        font-size: 18px;
        color: #bbb;
        transition: all .1s linear;

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

      button {
        width: fit-content;
        cursor: pointer;
        background: linear-gradient(90deg, #1c5fa2, #3e55a9);
        color: #fff;
        font-weight: 300;
        align-self: center;

        &.wrongAnswer {
          background: linear-gradient(90deg, #c64848, #bb4949);
        }

        &.rightAnswer {
          background: linear-gradient(90deg, #1d976c, #679277);
        }

        img {
          height: 10px;
        }
      }
    }
  }
</style>
