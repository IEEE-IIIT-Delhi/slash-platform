<script>
  import { fade } from 'svelte/transition'
  export let question

  let loading = false
  let buttonText = 'Check'
  let answer = ''
  let wrongAnswer = false
  let rightAnswer = false

  const wait = async ms => await new Promise(r => setTimeout(r, ms))

  $: answer = answer.replace(/[\s]+/g, '')

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

    const { success, reload } = await res.json()
    loading = false

    if (reload) {
      return window.location.reload()
    }

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

<p class='question-text'>{question}</p>

<form on:submit={checkAnswer} method='POST' class:wrongAnswer class:rightAnswer>
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
    {#if loading}
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

    &.rightAnswer {
      button {
        background: linear-gradient(90deg, #1d976c, #679277);
      }

      input {
        border-color: #1d976c;
      }
    }

    &.wrongAnswer {
      button {
        background: linear-gradient(90deg, #c64848, #bb4949);
      }

      input {
        border-color: #c64848;
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
