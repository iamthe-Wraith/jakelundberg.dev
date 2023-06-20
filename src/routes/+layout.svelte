<script lang="ts">
	import Nav from '$components/Nav.svelte';
  import './global.css';
</script>

<main>
  <header>
    <div />
    <Nav />
  </header>

  <slot />

  <footer>
    <!-- place footer stuff here -->
  </footer>
</main>

<style>
  header,
  footer {
    position: fixed;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 7vh;
    padding: 0.5rem 2rem;
    z-index: 99;
    box-sizing: border-box;
  }

  header {
    top: 0;
  }

  footer {
    bottom: 0;
  }

  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
