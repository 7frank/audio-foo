<script>
	import { userStore } from "../../components/userStore";
 </script>
  
  <main>
   
    {#if $userStore.status === 'loggedIn'}
      <pre>{JSON.stringify($userStore.user,null,'  ')}</pre>
    {:else}
        <pre>{JSON.stringify($userStore,null,'  ')}</pre>
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
  