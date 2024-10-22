<!-- <script>
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
</div> -->
<!-- <script>
  import axios from 'axios';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let errorMessage = '';

  // Check authentication state when the component loads
  onMount(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      window.location.href = '/prefix';  // Redirect if already logged in
    } else if (!token && window.location.pathname.startsWith('/prefix')) {
      window.location.href = '/login';  // Prevent access to /prefix if not logged in
    }
  });

  // Handle login logic
  async function handleLogin() {
    try {
      const response = await axios.post('http://10.80.6.165:3000/login', {
        username,
        password
      });
      const token = response.data.token;
      
      if (token) {
        localStorage.setItem('authToken', token);
        window.location.href = '/prefix';  // Redirect on successful login
      }
    } catch (error) {
      errorMessage = error.response?.status === 401
        ? 'Invalid username or password.'
        : 'Login failed. Please try again later.';
      console.error('Login error:', error);
    }
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
</div> -->
<script>
  import axios from 'axios';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let errorMessage = '';

  // Check authentication state when the component loads
  onMount(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      window.location.href = '/prefix';  // Redirect if already logged in
    } else if (!token && window.location.pathname.startsWith('/prefix')) {
      window.location.href = '/login';  // Prevent access to /prefix if not logged in
    }
  });

  // Handle login logic
  async function handleLogin() {
    try {
      const response = await axios.post('/api/login', {  // Use /api prefix
        username,
        password
      });
      const token = response.data.token;
      
      if (token) {
        localStorage.setItem('authToken', token);
        window.location.href = '/prefix';  // Redirect on successful login
      }
    } catch (error) {
      errorMessage = error.response?.status === 401
        ? 'Invalid username or password.'
        : 'Login failed. Please try again later.';
      console.error('Login error:', error);
    }
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