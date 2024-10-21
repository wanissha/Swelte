<!-- <script>
  import axios from "axios";
  let username = "";
  let password = "";
  let errorMsg = "";

  async function handleLogin() {
    try {
        const response = await axios.post("http://10.80.6.165:3000/login", {
            username,
            password,
        })
        if (response.status === 200) {
            alert(`Login successful! Welcome, ${username}` );  
            console.log(response.data);
            window.location.href = '/prefix';
        }
     
        
    } catch (error) {
        if (error.response && error.response.status == '401') {
            errorMsg = "Invalid username, or password";
        } else {
            errorMsg = "Login failed. Please try again later.";
        }
        console.log(errorMsg);       
    }
    
  }

</script>
<div class="container mt-5">
    <h1>Page Login</h1>
    <input type="text" placeholder="Username" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button type="submit" on:click="{handleLogin}">Login</button>

    {#if errorMsg}
    <div class="error">{errorMsg}</div>
    {/if}
</div>
<style scoped>
    .container {
        justify-content: center;  
        align-items: center; 
        
    }
    input {
        margin-top: 20px;
        border-radius: 5px;
        display: flex;
        margin-bottom: 10px;
        width: 300px;
        height: 40px;

    }
    button {
        width: 100px;
        height: 40px;
        border-radius: 5px;
        align-items: center;
        margin-left: 95px;
        background: rgb(108, 219, 108);
        border: 0 greenyellow;
        color: white;
    }
</style> -->
<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin() {
    try {
      const response = await axios.post('http://10.80.6.165:3000/login', {
        username,
        password
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token)
        window.location.href = '/prefix' 
      }
    } catch (error) {
      errorMessage = error.response?.status === 401
        ? 'Invalid username or password.'
        : 'Login failed. Please try again later.';
         window.location.href = '/login'
         console.log('error'); 
    }
    onMount(() => {
      let token = localStorage.getItem('authToken');
      if (token) {
        window.location.href = '/prefix'
      } else if(!token && window.location.pathname.startsWith('/prefix')) {
        window.location.href = '/login'
      }
    } )
    
  }
</script>



<div class="wrapper">
  <div class="container">
    <h1>Page Login</h1>
    <input type="text" placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={handleLogin}>Login</button>

    {#if errorMessage}
      <div class="error">{errorMessage}</div>
    {/if}
  </div>
</div>
<style scoped>
/* body {
    height: 100%;
    margin: 0;
    padding: 0;
  } */

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    background-color: #f0f0f0;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;  
  }

  input {
    margin-top: 20px;
    border-radius: 5px;
    display: flex;
    margin-bottom: 10px;
    width: 300px;
    height: 40px;
  }

  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    align-items: center;
    background: rgb(108, 219, 108);
    border: 0 greenyellow;
    color: white;
    cursor: pointer;
    margin-top: 10px;
  }

  button:hover {
    background: rgb(85, 180, 85);
  }

  .error {
    color: red;
    margin-top: 10px;
  }
</style>