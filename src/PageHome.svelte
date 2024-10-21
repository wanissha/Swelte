<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import MyCompo from "./lib/MyCompo.svelte";
    let var_a = "My Svelte";
    let count = 0;
    $: double = count * 2;
    $: if (count > 10) {
      alert("Count > 10");
      count = 0;
    }
    function handleClick() {
      count++;
    }
    let data = []
    onMount(async () => {
      // alert("ON MOUNT")
      let res = await axios.get('http://10.80.6.165:3000/prefixes/')
      data = res.data.data
    });
    let name = {
      name:"My Svelte"
    }
  </script>
  
  <div class="container">
    <MyCompo {...name} />
    <h1>Hello World! Svelte - {var_a}</h1>
    <h1>Count : {count}</h1>
    {#if double > 10}
      <h1>Double : {double}</h1>
    {:else}
      <h1>Double 10</h1>
    {/if}
    <button on:click={handleClick}>Click me</button>
    <input type="text" bind:value={var_a} />
    <ul>
    {#each data as item }
      <li>{item.name}</li>  
    {/each}
    </ul>
  </div>
  