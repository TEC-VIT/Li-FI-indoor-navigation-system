import React,{useState} from 'react'


function Pathdisc() {


  fetch('https://still-dawn-71437.herokuapp.com/')
  .then(response => response.json())
  .then(data => console.log(data[-1].location));





 const[start,setStart]=useState(false)
 const[end,setEnd]=useState(false)

    
// let graph = {
// 	0: { 1: 5, 2: 2 },
// 	1: { 0: 1, 3: 4, 4: 2 },
// 	2: { 1: 8, 4: 7 },
// 	3: { 4: 6, 5: 3 },
// 	4: { 5: 1 },
// 	5: {},
// };

let graph = {
    0: {1:1, 11:1},
    1: {0:1, 2:1, 12:1},
    2: {1:1, 3:1, 12:1, 13:1},
    3: {2:1, 4:1, 13:1},
    4: {3:1, 5:1},
    5: {4:1, 6:1},
    6: {5:1, 7:1},
    7: {6:1, 8:1, 13:1},
    8: {7:1, 9:1, 12:1, 13:1},
    9: {8:1, 10:1, 12:1},
    10: {9:1, 11:1},
    11: {0:1, 10:1},
    12: {1:1, 2:1, 8:1, 9:1},
    13:{2:1, 3:1, 7:1, 8:1},
}

// Tested architecture -


// 10----9----------8--------------7------6       
// |           |           |              |
// |           |           |              |
// 11          12         13              5
// |           |           |              |
// |           |           |              |
// 0--------1----------2--------3---------4

let shortestDistanceNode = (distances, visited) => {
    // create a default value for shortest
      let shortest = null;
      
        // for each node in the distances object
      for (let node in distances) {
          // if no node has been assigned to shortest yet
            // or if the current node's distance is smaller than the current shortest
          let currentIsShortest =
              shortest === null || distances[node] < distances[shortest];
              
            // and if the current node is in the unvisited set
          if (currentIsShortest && !visited.includes(node)) {
              // update shortest to be the current node
              shortest = node;
          }
      }
      return shortest;
  };



let findShortestPath = (graph, startNode, endNode) => {
 
    // track distances from the start node using a hash object
      let distances = {};
    distances[endNode] = "Infinity";
    distances = Object.assign(distances, graph[startNode]);
   // track paths using a hash object
    let parents = { endNode: null };
    for (let child in graph[startNode]) {
     parents[child] = startNode;
    }
     
    // collect visited nodes
      let visited = [];
   // find the nearest node
      let node = shortestDistanceNode(distances, visited);
    
    // for that node:
    while (node) {
    // find its distance from the start node & its child nodes
     let distance = distances[node];
     let children = graph[node]; 
         
    // for each of those child nodes:
         for (let child in children) {
     
     // make sure each child node is not the start node
           if (String(child) === String(startNode)) {
             continue;
          } else {
             // save the distance from the start node to the child node
             let newdistance = distance + children[child];
   // if there's no recorded distance from the start node to the child node in the distances object
   // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
             if (!distances[child] || distances[child] > newdistance) {
   // save the distance to the object
        distances[child] = newdistance;
   // record the path
        parents[child] = node;
       } 
            }
          }  
         // move the current node to the visited set
         visited.push(node);
   // move to the nearest neighbor node
         node = shortestDistanceNode(distances, visited);
       }
     
    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
     shortestPath.push(parent);
     parent = parents[parent];
    }
    shortestPath.reverse();
     
    //this is the shortest path
    let results = {
     distance: distances[endNode],
     path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
      return results;
   };

  //  var= startpoint
  //  var= endpoint
  //  start= feched()
  //  endpoint=feched()

var path= findShortestPath(graph, start, end)['path'];
var text = path.toString();

//console.log(findShortestPath(graph, 4, 10)['path']);




    return (
        <div>
            <div>
            <form>
            <label for="fname">Starting Location:</label><br />
            {/* <input type="int" id="fname" name="fname" /><br /> */}
            <input placeholder="Answer"  type='int' value={start} onChange={(event)=>{ setStart(event.target.value)}} />
            <label for="lname">Ending Location:</label><br />
            {/* <input type="int" id="lname" name="lname" /> */}
            <input placeholder="Answer"  type='int' value={end} onChange={(event)=>{ setEnd(event.target.value)}} />
            </form>

            </div>
            <div>
                <button type="button">Find path </button>
            </div>



            <div>
             <pre>   
            10----9----------8--------------7------6 <br />      
            |           |           |              |<br />
            |           |           |              |<br />
            11          12         13              5<br />
            |           |           |              |<br />
            |           |           |              |<br />
            0--------1----------2--------3---------4<br />

            </pre>
                
            </div>
            <div>
                {start?(<div>{text}</div>):null}
            </div>
        </div>
    )
}

export default Pathdisc
