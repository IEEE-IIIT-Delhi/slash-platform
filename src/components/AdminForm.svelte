<script>
  import { fade } from 'svelte/transition'

  export let action
  export let buttonValue
  export let heading
  export let displayResponse = false
  export let displayResponseFormatter

  let buttonText = buttonValue

  let formElement
  let response

  async function handleForm(event) {
    event.preventDefault()

    const formData = new FormData(formElement)
    const formDataJson = JSON.stringify(Object.fromEntries(formData))

    buttonText = 'Loading...'

    response = await fetch(action, {
      method: 'POST',
      body: formDataJson,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    buttonText = buttonValue
  }
</script>

<form class='admin' bind:this={formElement} on:submit={handleForm} method="POST">
  <h2>{heading}</h2>

  {#if response}
    <p
      transition:fade={{ duration: 200 }}
      class='message'
      class:error={!response.success}
    >
      {response.message}
    </p>
  {/if}

  <slot />

  {#if response && response.success && displayResponse}
    <table transition:fade={{ duration: 200 }}>
      {#each displayResponseFormatter(response.data) as [key, value]}
        <tr>
          <td class='label'>{key}</td>
          <td>{value}</td>
        </tr>
      {/each}
    </table>
  {/if}

  <div class="input-grp">
    <input type='submit' value={buttonText}>
  </div>
</form>

<style lang="scss" global>
  @import "../../styles/admin-forms.scss";

  p.message {
    margin-top: 20px;
    display: block;
    text-align: center;
    line-height: 1.5;
    font-weight: 500;
    font-size: 16px;
    color: #71a271;

    &.error {
      color: #cf6f6f;
    }
  }

  table {
    td {
      padding: 5px 0;

      &.label {
        padding-right: 20px;
        font-weight: bold;
      }
    }
  }
</style>
