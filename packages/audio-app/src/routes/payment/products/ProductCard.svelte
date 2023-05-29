<script lang="ts">
    export let productName:string;
    export let productPrice:number;
    export let productDescription:string;
    export function onBuy(name:string){}

  </script>
  
<div class="card">
  <div class="header">
     <h2>{productName}</h2>
     <p class="price">${productPrice}</p>
  </div>
  <p class="description">{productDescription}</p>
 
  <!-- Optional image placeholder -->
  <div class="image-placeholder">
    <img height=100% src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Dollar_bill_and_small_change.jpg" alt="{productDescription}"/>
  </div>
  
  {#if productPrice}
    <button class="buy-button" on:click={()=> onBuy(productName)}>Buy for ${productPrice}</button>
  {/if}
</div>

<style>
  .card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  
  h2 {
    margin: 0;
  }
  
  .price {
    font-weight: bold;
    margin: 0;
  }
  
  .description {
    margin-top: 8px;
  }
  
  .image-placeholder {
    background-color: #cccccc;
    height: 200px;
    margin-top: 16px;
    border-radius: 4px;
  }
  
  .buy-button {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 16px;
  }
</style>