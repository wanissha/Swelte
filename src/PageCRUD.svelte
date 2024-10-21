<script>
    import { onMount } from "svelte";
    import axios from "axios";
    
    let loading = true;
    let data = [];
    let name = "";
    let selectedId = null;

    async function getData() {
        try {
            let result = await axios.get("http://10.80.6.165:3000/prefixes");
            data = result.data.data;
            loading = false;
        } catch (e) {
            console.log(e);
        }
    }

    onMount(() => {
        getData();
    });

    async function insertData() {
        try {
            let result = await axios.post("http://10.80.6.165:3000/prefix", { name });
            console.log(result);
            loading = true;
            name = "";
            getData(); // Reload data
        } catch (e) {
            console.log(e);
        }
    }

    async function updateData() {
        try {
            let result = await axios.put("http://10.80.6.165:3000/prefix", { 
                id: selectedId, 
                name 
            });
            console.log(result);
            loading = true;
            selectedId = null;
            name = "";
            getData(); // Reload data
        } catch (e) {
            console.log(e);
        }
    }

    async function handleDelete(id) {
        try {
            await axios.delete("http://10.80.6.165:3000/prefix", {
                data: { id }
            });
            loading = true;
            getData(); // Reload data
        } catch (e) {
            console.log(e);
        }
    }

    function handleEdit(item) {
        selectedId = item.id;
        name = item.name;
    }
    function handleLogout() {
        localStorage.removeItem('authToken');
        window.location.href = '/login'
    }
</script>

<div class="app-container">
    <div class="header">
        <h1 class="app-title">Prefix Management</h1>
        <button class="btn logout-btn" on:click={handleLogout}>Logout</button>
    </div>
    <div class="input-container mb-2" >
        <input 
            type="text" 
            class="text-input" 
            bind:value={name} 
            placeholder="Prefix Name"
        />

        {#if selectedId}
            <button class="btn update-btn" on:click={updateData}>Update Prefix</button>
        {:else}
            <button class="btn insert-btn" on:click={insertData}>Insert Prefix</button>
        {/if}
    </div>
    <div class="table-container">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#if loading}
                    <tr>
                        <td colspan="3">Loading...</td>
                    </tr>
                {:else}
                    {#each data as item, index}
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>
                                <button class="btn edit-btn" on:click={() => handleEdit(item)}>Edit</button>
                                <button class="btn delete-btn" on:click={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>

<style>
    .app-container {
        padding: 20px;
    }
    .app-title {
        font-size: 24px;
        margin-bottom: 20px;
    }
    .table-container {
        margin-bottom: 20px;
    }
    .data-table {
        width: 100%;
        border-collapse: collapse;
    }
    .data-table th, .data-table td {
        padding: 10px;
        border: 1px solid #ccc;
        text-align: left;
    }
    .input-container {
        margin-top: 20px;
    }
    .text-input {
        margin-right: 10px;
        padding: 8px;
        border: 1px solid #ccc;
    }
    .btn {
        padding: 8px 12px;
        margin-right: 10px;
        cursor: pointer;
    }
    .edit-btn {
        background-color: #f0ad4e;
        color: white;
    }
    .delete-btn {
        background-color: #d9534f;
        color: white;
    }
    .insert-btn {
        background-color: #5cb85c;
        color: white;
    }
    .update-btn {
        background-color: #5bc0de;
        color: white;
    }
    .header {
         display: flex;
        justify-content: space-between; /* Pushes title left, button right */
        align-items: center; /* Vertically center-aligns elements */
        margin-bottom: 20px;
    }
    .logout-btn {
        background-color: #b9250e;
        color: white;
       
    }
</style>
