<script lang="ts">
  import { Chart } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    LineElement,
    LineController,
    PointElement,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import { electric, electricLoading, getChartData } from '../lib/data';
  import { formatMonth } from '../lib/format';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    LineElement,
    LineController,
    PointElement,
    Tooltip,
    Legend,
    Filler
  );

  type ViewMode = 'both' | 'usage' | 'cost';
  let viewMode: ViewMode = $state('both');
  let isMobile = $state(window.innerWidth < 640);

  $effect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    const handler = (e: MediaQueryListEvent) => { isMobile = e.matches; };
    isMobile = mql.matches;
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  });

  const chartData = $derived($electric ? getChartData($electric) : []);
  const labels = $derived(chartData.map((d) => formatMonth(d.month, d.year)));

  const barColors = $derived(
    chartData.map((_, i) => (i === chartData.length - 1 ? '#00a86b' : '#007749'))
  );

  const data = $derived({
    labels,
    datasets: [
      ...(viewMode !== 'cost'
        ? [
            {
              type: 'bar' as const,
              label: 'Usage (KWH)',
              data: chartData.map((d) => d.usage),
              backgroundColor: barColors,
              borderRadius: 6,
              borderSkipped: false as const,
              yAxisID: 'y',
              order: 2,
            },
          ]
        : []),
      ...(viewMode !== 'usage'
        ? [
            {
              type: 'line' as const,
              label: 'Cost ($)',
              data: chartData.map((d) => d.cost),
              borderColor: '#38bdf8',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              borderWidth: 2,
              pointBackgroundColor: '#38bdf8',
              pointRadius: isMobile ? 2 : 4,
              pointHoverRadius: isMobile ? 4 : 6,
              tension: 0.3,
              fill: true,
              yAxisID: 'y1',
              order: 1,
            },
          ]
        : []),
    ],
  });

  const options = $derived({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: isMobile ? 0 : 4,
        right: isMobile ? 0 : 4,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1d27',
        borderColor: '#2a2d3a',
        borderWidth: 1,
        titleColor: '#e4e4e7',
        bodyColor: '#9ca3af',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label(ctx: any) {
            if (ctx.dataset.label?.includes('KWH')) {
              return ` ${ctx.parsed.y.toLocaleString()} KWH`;
            }
            return ` $${ctx.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(42, 45, 58, 0.5)' },
        ticks: {
          color: '#6b7280',
          font: { size: isMobile ? 9 : 11 },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 6 : 12,
        },
      },
      y: {
        display: viewMode !== 'cost',
        position: 'left' as const,
        grid: { color: 'rgba(42, 45, 58, 0.5)' },
        ticks: {
          color: '#6b7280',
          font: { size: isMobile ? 9 : 11 },
          callback(value: any) {
            return `${value.toLocaleString()}`;
          },
        },
        title: {
          display: !isMobile,
          text: 'KWH',
          color: '#6b7280',
        },
      },
      y1: {
        display: viewMode !== 'usage',
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: {
          color: '#6b7280',
          font: { size: isMobile ? 9 : 11 },
          callback(value: any) {
            return `$${value}`;
          },
        },
        title: {
          display: !isMobile,
          text: 'Cost',
          color: '#6b7280',
        },
      },
    },
  });
</script>

<div class="bg-surface rounded-2xl border border-border p-3 sm:p-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
    <h2 class="text-white text-base font-semibold">Usage Over Time</h2>
    <div class="flex gap-1 bg-bg rounded-lg p-1 w-full sm:w-auto">
      <button
        class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors {viewMode === 'both' ? 'bg-accent text-white' : 'text-text-muted hover:text-text'}"
        onclick={() => viewMode = 'both'}
      >
        Both
      </button>
      <button
        class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors {viewMode === 'usage' ? 'bg-accent text-white' : 'text-text-muted hover:text-text'}"
        onclick={() => viewMode = 'usage'}
      >
        KWH
      </button>
      <button
        class="flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium rounded-md transition-colors {viewMode === 'cost' ? 'bg-accent text-white' : 'text-text-muted hover:text-text'}"
        onclick={() => viewMode = 'cost'}
      >
        Cost
      </button>
    </div>
  </div>

  {#if viewMode === 'both'}
    <div class="flex gap-4 mb-4 text-xs text-text-muted">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-accent inline-block"></span>
        Usage (KWH)
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-cost-line inline-block"></span>
        Cost ($)
      </span>
    </div>
  {/if}

  <div class="h-[300px] sm:h-[350px]">
    {#if $electricLoading}
      <div class="h-full flex items-end gap-2 sm:gap-3 px-2 pb-6 animate-pulse">
        {#each [40, 65, 55, 80, 90, 70, 50, 45, 60, 75, 85, 55, 48] as h}
          <div class="flex-1 bg-border rounded-t" style="height: {h}%"></div>
        {/each}
      </div>
    {:else if $electric && chartData.length > 0}
      <Chart type="bar" {data} {options} />
    {:else}
      <div class="h-full flex items-center justify-center">
        <p class="text-text-dim text-sm">No usage data available</p>
      </div>
    {/if}
  </div>
</div>
