<script lang="ts">
    import { onMount } from 'svelte';
    import {Chart} from 'chart.js/auto';
  
    interface Keystroke {
      key: string;
      timestamp: number;
    }
  
    export 
    let keystrokes: Keystroke[] = [];
  
    let mChart:Chart;

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;
      const timestamp = new Date().getTime();
      keystrokes.push({ key, timestamp });
      renderChart();
    }
  
    function renderChart() {
      
        if(mChart)
        mChart.destroy();

      const data :any = {
        labels: [],
        datasets: [
          {
            label: 'Time Between Keystrokes',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      };
  
      for (let i = 1; i < keystrokes.length; i++) {
        const timeDiff = keystrokes[i].timestamp - keystrokes[i - 1].timestamp;
        data.labels.push(i.toString());
        data.datasets[0].data.push(timeDiff);
      }
  
      const ctx = document.getElementById('chart') as HTMLCanvasElement;
      mChart=new Chart(ctx, {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Time (ms)',
              },
            },
          },
        },
      });
    }
  
    onMount(() => {
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    });
  </script>
  
  <canvas id="chart"></canvas>


  <style>
canvas{
background : white;

}

  </style>