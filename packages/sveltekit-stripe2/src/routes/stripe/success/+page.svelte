<script lang="ts">

  // @ts-ignore
    export let data;

    console.log(data)
  </script>
  
  <main>
    {#if data}
      <pre style="height:400px">{JSON.stringify(data, null, 2)}</pre>
       {:else}
      <p>Loading...</p>
    {/if}
  </main>
  
  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
    }
  </style>