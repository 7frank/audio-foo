<script lang="ts">

import { userStore } from "../components/userStore";

 
    import { onMount } from 'svelte';
  
    onMount(() => {
      // Load Font Awesome icons // TODO remove  if no longer necessary
      import('@fortawesome/fontawesome-free/js/all.js');
    });

  </script>
  
 
   
    <div class="company-icons">
      
    {#if $userStore.status === 'loggedIn'}
       <span>Logged in as {$userStore.user.email}</span>
    {:else if $userStore.status === 'notLoggedIn'}
    <h2>not logged in</h2>
    <div class="company-icon" >
      <i class="fab fa-github"></i>
      <span class="company-name">GitHub </span>
    </div>
    <div class="company-icon" >
       <i class="fab fa-google"></i>
      <span class="company-name"> Google</span>
    </div>
    {:else if $userStore.status === 'failed'}
    <h2>Login error occurred</h2>
      {/if}
    
    </div>
  <style>
   
  
    .company-icons {
      display: flex;
      justify-content: center;
    }
  
    .company-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
      cursor: pointer;
    }
  
    .company-icon i {
      font-size: 32px;
      transition: color 0.3s;
    }
  
    .company-icon:hover i {
      color: blue;
    }
  
    .company-name {
      margin-top: 5px;
      opacity: 0;
      transition: opacity 0.3s;
    }
  
    .company-icon:hover .company-name {
      opacity: 1;
    }
  </style>
  
