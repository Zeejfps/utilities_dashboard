<script lang="ts">
  import { auth } from './lib/auth';
  import { loadAllData } from './lib/data';
  import Login from './components/Login.svelte';
  import Header from './components/Header.svelte';
  import BillCard from './components/BillCard.svelte';
  import UsageSnapshot from './components/UsageSnapshot.svelte';
  import AccountInfo from './components/AccountInfo.svelte';
  import UsageChart from './components/UsageChart.svelte';


  $effect(() => {
    if ($auth.token) {
      loadAllData();
    }
  });
</script>

{#if $auth.token}
  <div class="h-screen overflow-y-auto overscroll-none bg-bg">
    <Header />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
      <BillCard />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsageSnapshot />
        <AccountInfo />
      </div>

      <UsageChart />
    </main>
  </div>
{:else}
  <div class="h-screen overflow-y-auto">
    <Login />
  </div>
{/if}
