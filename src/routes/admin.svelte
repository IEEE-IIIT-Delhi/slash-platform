<script context="module">
  export async function preload (page, session) {
    if (!session.user || !session.user.admin) {
      this.redirect(302, '/')
      return
    }
  }
</script>

<script>
  import AdminForm from '../components/admin-form.svelte'
</script>

<main>
  <section>
    <h1>Admin Panel</h1>

    <a href="/stats">View statistics</a>

    <AdminForm
      heading="Add admin"
      action="/api/add-admin"
      buttonValue="Add"
    >
      <div class='input-grp'>
        <label for='username'>Username</label>
        <input type='text' name='username' placeholder='Username' required>
      </div>
    </AdminForm>

    <AdminForm
      heading="Add question"
      action="/api/add-question"
      buttonValue="Add"
    >
      <div class='input-grp'>
        <label for='level'>Level</label>
        <input type='number' name='level' placeholder='Level' required>
      </div>
      <div class='input-grp'>
        <label for='question'>Question</label>
        <textarea name="question" placeholder='Question text' required></textarea>
      </div>
      <div class='input-grp'>
        <label for='answer'>Answer</label>
        <input type='text' name='answer' placeholder='Answer' required>
      </div>
    </AdminForm>

    <AdminForm
      heading="Disqualify player"
      action="/api/disqualify-player"
      buttonValue="Disqualify"
    >
      <div class='input-grp'>
        <label for='username'>Player username</label>
        <input type='text' name='username' placeholder='Username' required>
      </div>
    </AdminForm>

    <AdminForm
      heading="Update player level"
      action="/api/update-player-level"
      buttonValue="Update"
    >
      <div class='input-grp'>
        <label for='username'>Player username</label>
        <input type='text' name='username' placeholder='Username' required>
      </div>
      <div class='input-grp'>
        <label for='level'>Level</label>
        <input type='number' name='level' placeholder='Level' required>
      </div>
    </AdminForm>

    <AdminForm
      heading="Update question"
      action="/api/update-question"
      buttonValue="Update"
    >
      <div class='input-grp'>
        <label for='level'>Level</label>
        <input type='number' name='level' placeholder='Level' required>
      </div>
      <div class='input-grp'>
        <label for='question'>Question</label>
        <textarea name="question" placeholder='Question text' required></textarea>
      </div>
      <div class='input-grp'>
        <label for='answer'>Answer</label>
        <input type='text' name='answer' placeholder='Answer' required>
      </div>
    </AdminForm>
  </section>
</main>

<style lang="scss">
  main {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  section {
    width: 85%;
    max-width: 600px;
    margin: 15vh auto 50px;

    h1 {
      margin-bottom: 2vh;
      font-size: 36px;
      display: flex;
      align-items: flex-end;

      &:after {
        content: '';
        flex: 1;
        height: 5px;
        margin: 0 0 10px 20px;
        background: #461f26;
      }
    }

    a {
      color: #fff;
      background: #1f2122;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
      display: inline-block;
      margin: 1vh 0;
      box-shadow: 0 5px 10px rgba(0,0,0,.12);
    }
  }
</style>
