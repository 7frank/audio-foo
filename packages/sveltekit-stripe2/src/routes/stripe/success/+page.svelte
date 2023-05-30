<script lang="ts">
    import { onMount } from 'svelte';
  
    let sessionData:object;
    let errorMessage:string;
  
    onMount(async () => {
      const sessionId = '{CHECKOUT_SESSION_ID}';
      const apiUrl = `https://api.stripe.com/v1/checkout/sessions/${sessionId}`;
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic c2tfdGVzdF9ZMTdLb2toQzNTUllDVFpDSTo=',
          },
        });
  
        if (response.ok) {
          sessionData = await response.json();
        } else {
          throw new Error(`Failed to fetch session data. Status: ${response.status}`);
        }
      } catch (error) {
        errorMessage = (error as any).message;
      }
    });
  </script>
  
  <main>
    {#if sessionData}
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    {:else if errorMessage}
      <p>Error: {errorMessage}</p>
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