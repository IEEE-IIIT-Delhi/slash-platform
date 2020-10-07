<script>
  import { fade } from 'svelte/transition'

  export let action
  export let buttonValue
  export let heading

  let formElement;
  let response;

  async function handleForm(event) {
    event.preventDefault()

    const formData = new FormData(formElement)
    const formDataJson = JSON.stringify(Object.fromEntries(formData))

    response = await fetch(action, {
      method: 'POST',
      body: formDataJson,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }
</script>

<form bind:this={formElement} on:submit={handleForm} method="POST">
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

  <div class="input-grp">
    <input type='submit' value={buttonValue}>
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
</style>
