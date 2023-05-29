<script>
  import { io } from "socket.io-client";
	import { taskProgress } from "./store";

  var socket = io(); 

   socket.on('progress', function(msg) {
    console.log("on Progress",msg)
    $taskProgress=[...$taskProgress,msg]
 }); 


</script>
  
  <div>
   
  </div> 
   
  <div id="output">
    
    {#each $taskProgress as {type,taskId, ...rest}}
		<li><a target="_blank" href="#" rel="noreferrer">
			{type} {taskId??""}
		</a>  {JSON.stringify(rest)} </li>
	{/each}
  </div>
   