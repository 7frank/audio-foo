
<script lang="ts">
	import { onMount } from "svelte";
  import ProductCard from './ProductCard.svelte';
  
  import Stripe from 'stripe';
const stripe = new Stripe('pk_test_5LEOzAZjRb0z88NvmSJYrVFF00uxVknCM4',{ apiVersion: '2022-11-15',});


  
  let productsData:any[]=[]
    let error = "";
  
  async function fetchProducts() {
    const response = await fetch("http://localhost:8080/api/payment/stripe/products");
    if (!response.ok)
    {
      error=""+response.status+response.statusText
      return;
    }
    const json=await response.json()
    
    productsData = json

  }

  onMount(() => {
      fetchProducts().catch(e => error=e.message)
  })


  async function tryOldPaymentIntent(productName:string){

  const p= fetch("http://localhost/api/payment/stripe/create-checkout-session?p="+productName)

   const json=await p.then(r=> r.json())

    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.retrieve(
      'pi_123456789',
      {
        expand: ['customer'],
      }
    );
    const customerEmail: string|null = (paymentIntent.customer as Stripe.Customer).email;

console.log(customerEmail)


  }

  </script>
  
  <main>
   
    {#if productsData}

    {#each Object.entries(productsData) as [k,p]}
    <br/>
    <ProductCard
    
      productName={p.name}
      productPrice={p.price}
     productDescription={p.description}
     onBuy={(name)=> tryOldPaymentIntent(name)}
    />
    {/each}

     
    {/if}
    {#if error}
      <pre>{error}</pre>
    {/if}

  </main>
  
