<script>
	import { onMount } from "svelte";
	import { userStore,User } from "../../components/userStore";


    let error = "";
  
  async function fetchUser() {
    const response = await fetch("http://localhost/api/auth/github/me");
    if (!response.ok)
    {
      error=""+response.status+response.statusText
      return;
    }
    const json=await response.json()
    
    $userStore = User.parse(json)

  }

  onMount(() => {
      fetchUser().catch(e => error=e.message)
  })

  </script>
  
  <main>
   
    {#if $userStore}
      <pre>{JSON.stringify($userStore,null,'  ')}</pre>
    {/if}
    {#if error}
      <pre>{error}</pre>
    {/if}

  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
  
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  
    pre {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f4f4f4;
      max-width: 600px;
      overflow-x: auto;
    }
  </style>
  