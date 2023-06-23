<script lang="ts">
	import { createRace } from "./store";





	const race= createRace("Type the text here");
     

	let diffPos=0
    let currentCursorPos=0
	let ref:HTMLInputElement;
      
    function start() {
          if (!$race. isTyping) {
              console.log("start")
			  $race.isTyping = true;
			  $race.startTime = new Date();
			  $race.interval = setInterval(() => run(), 50);
			  ref.focus(); 
          }
        }
      
        function stop() {
          if ($race.isTyping) {
            $race.isTyping = false;
            $race.endTime = new Date();
            clearInterval($race.interval!);
            calculateWPM();
          }
        }
      
        function run() {
          // Perform any additional logic during the typing practice interval
          // For example, you can track user input and update the displayed text.

		  calculateWPM()
		  diffPos=findFirstDifference($race.text, $race.userInput)
		  currentCursorPos=$race.userInput.length
        }
      
         function calculateWPM() {
          const timeInSeconds = ($race.endTime.getTime() - $race.startTime.getTime()) / 1000;
         
          $race.wpm = Math.round(diffPos / (timeInSeconds / 5));
          console.log(`Your WPM: ${$race.wpm}`);
        }
      


		function findFirstDifference(text1:string, text2:string) {
			const length = Math.min(text1.length, text2.length);
			
			for (let i = 0; i < length; i++) {
				if (text1[i] !== text2[i]) {
				return i;
				}
			}
			
			// If the loop completes without finding a difference,
			// check if the lengths of the texts are different
			if (text1.length !== text2.length) {
				return length;
			}
			
			// If the lengths and all characters are the same, return -1
			return -1;
			}

			
  </script>
  
  <style>
	input {
	  width: 60%;
	  
	  resize: none;
	}
  </style>
  
  <h1>Typing Practice</h1>
  
 
  <button on:click={()=>start()} >Start Race</button>

  <h1>WPM: {$race.wpm} </h1>

  <p>	{#each $race.text.split("") as item, i (i)}
	<span style="background-color: {i<diffPos?"lightgreen": (i<currentCursorPos && diffPos<currentCursorPos )?"red":"white"};">{item}</span>
	{/each}
  </p>
  <input bind:this={ref}
	bind:value={$race.userInput}
	disabled={!$race.isTyping}
	

	
  />