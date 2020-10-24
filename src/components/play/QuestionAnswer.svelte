<script>
  import { fade } from 'svelte/transition'
  export let question

  const states = { STEADY: 0, LOADING: 1, WRONG: 2, RIGHT: 3 }
  let state = states.STEADY
  let buttonText = 'Check'
  let answer = ''

  $: answer = answer.replace(/[\s]+/g, '').toLowerCase()
  $: buttonText =
    state === states.RIGHT ? 'Correct!' :
    state === states.WRONG ? 'Nope!' : 'Check'

  const wait = async ms => await new Promise(r => setTimeout(r, ms))

  async function checkAnswer (event) {
    event.preventDefault()

    if (state === states.LOADING) {
      return
    }

    state = states.LOADING
    const res = await fetch('/api/check-answer', {
      method: 'POST',
      body: JSON.stringify({
        answer,
        timeString: new Date().toLocaleTimeString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { success, reload } = await res.json()
    state = states.STEADY

    if (reload) {
      return window.location.reload()
    }

    if (success) {
      state = states.RIGHT
      await wait(1000)
      window.location.reload()
    } else {
      state = states.WRONG
      await wait(1000)
      state = states.STEADY
    }
  }
</script>

<p class='question-text'>{@html question}</p>

<form
  class="state-{state}"
  on:submit={checkAnswer}
  method='POST'
>
  <div class="input-container">
    <input
      type='text'
      name='answer'
      placeholder='Answer'
      bind:value={answer}
      required
    >
  </div>
  <button>
    {#if state === states.LOADING}
      <img src="/loading.svg" alt="">
    {:else}
      <span in:fade={{ duration: 200 }}>
        {buttonText}
      </span>
    {/if}
  </button>
</form>

<style lang='scss'>
  p.question-text {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 300;
    margin: 30px 0;
  }

  :global(p.question-text a) {
    color: #008eff;
  }

  :global(p.question-text img) {
    max-height: 300px;
    display: block;
    margin: 2.5vh auto;
  }

  :global(p.question-text pre) {
    overflow-x: auto;
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

    &.state-2 {
      button {
        background: linear-gradient(90deg, #c64848, #bb4949);
      }

      input {
        border-color: #c64848;
      }
    }

    &.state-3 {
      button {
        background: linear-gradient(90deg, #1d976c, #679277);
      }

      input {
        border-color: #1d976c;
      }
    }

    button {
      width: fit-content;
      cursor: pointer;
      background: linear-gradient(90deg, #1c5fa2, #3e55a9);
      color: #fff;
      align-self: center;

      img {
        height: 10px;
      }
    }
  }
</style>
