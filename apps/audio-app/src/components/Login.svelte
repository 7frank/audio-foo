<script lang="ts">

import { userStore,User } from "../components/userStore";

    const handleLoginWithGoogle = () => {
      window.location.href = '/auth/google';
    };
  
    const handleLoginWithFacebook = () => {
      window.location.href = '/auth/facebook';
    };
  
    const handleLoginWithGitHub = () => {
      window.location.href = 'api/auth/github';
    };
 
    import { onMount } from 'svelte';
  
    onMount(() => {
      // Load Font Awesome icons
      import('@fortawesome/fontawesome-free/js/all.js');
    });

  </script>
  
 
   
    <div class="company-icons">
      
    {#if $userStore}
       <span>Logged in as {$userStore.email}</span>
    {:else}
    <h2>Login with:</h2>
    <div class="company-icon" on:click={handleLoginWithGitHub}>
      <i class="fab fa-github"></i>
      <span class="company-name">GitHub</span>
    </div>
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
  
