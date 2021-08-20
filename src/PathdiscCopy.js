import React, { useState } from 'react'
import './pathdisccopy.css'

function PathdiscCopy() {

    
    

    //const [start, setStart] = useState()
    const [end, setEnd] = useState(false)
    const [startPlaceholder,setStartPlaceholder]=useState('')
    var start

    
    fetch('https://still-dawn-71437.herokuapp.com/')
        .then(response => response.json())
        .then(data => setStartPlaceholder(data[data.length-1].location));

        console.log(startPlaceholder)
        var startPlaceholder2 = parseInt(startPlaceholder.substr(startPlaceholder.length-2,startPlaceholder.length-1))
        //setStart(startPlaceholder2)
        // setStart(parseInt(startPlaceholder[startPlaceholder.length-2]))
        console.log(startPlaceholder2)
        console.log(typeof startPlaceholder2)
        //setStart(startPlaceholder2)


    // const [start, setStart] = useState(false)
    // const [end, setEnd] = useState(false)
    //  let [text,setText]=useState(false)


    // let graph = {
    // 	0: { 1: 5, 2: 2 },
    // 	1: { 0: 1, 3: 4, 4: 2 },
    // 	2: { 1: 8, 4: 7 },
    // 	3: { 4: 6, 5: 3 },
    // 	4: { 5: 1 },
    // 	5: {},
    // };

    let graph = {
        0: { 1: 1, 11: 1 },
        1: { 0: 1, 2: 1, 12: 1 },
        2: { 1: 1, 3: 1, 12: 1, 13: 1 },
        3: { 2: 1, 4: 1, 13: 1 },
        4: { 3: 1, 5: 1 },
        5: { 4: 1, 6: 1 },
        6: { 5: 1, 7: 1 },
        7: { 6: 1, 8: 1, 13: 1 },
        8: { 7: 1, 9: 1, 12: 1, 13: 1 },
        9: { 8: 1, 10: 1, 12: 1 },
        10: { 9: 1, 11: 1 },
        11: { 0: 1, 10: 1 },
        12: { 1: 1, 2: 1, 8: 1, 9: 1 },
        13: { 2: 1, 3: 1, 7: 1, 8: 1 },
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

    if(startPlaceholder2!=NaN)
    {
        start=startPlaceholder2
    }


    var path = findShortestPath(graph, start, end)['path'];
    var text = path.toString()
    





    function f_color() {
        // document.getElementsByClassName('map')[0].style.color='white'
        for (var i = 0; i < path.length; i++) {
            if (document.getElementById(path[i])) {
                document.getElementById(path[i]).style.color = 'green'

            }
            
            
        }
        if(path.length=0)
        document.getElementsByClassName('map').style.color='white'
        


        
    }
    //setStart(startPlaceholder2)

    //console.log(findShortestPath(graph, 4, 10)['path']);




    return (
        <div className='big-div'>
            <div>
                <h1>Lifi - Path</h1>
                <form>
                    <div className='start-div'>
                        <label className='input-boxes' for="fname">Starting Location:</label><br />
                        {/* <input type="int" id="fname" name="fname" /><br /> */}
                        <input  value={startPlaceholder2}    /><br />
                    </div>
                    <div className='start-div'>
                        <label className='input-boxes' for="lname">Ending Location:</label><br />
                        {/* <input type="int" id="lname" name="lname" /> */}
                        <input placeholder="Answer" type='int' value={end} onChange={(event) => { setEnd(event.target.value) }} />
                    </div>
                </form>

            </div>
            <div>
                <button type="button"  >Find path </button>
            </div>



            <div>
                <pre className='map'>
                    <span id='10'>10</span>----<span id='9'>9</span>----------<span id='8'>8</span>--------------<span id='7'>7</span>------<span id='6'>6</span> <br />
                    |           |           |              |<br />
                    |           |           |              |<br />
                    <span id='11'>11</span>          <span id='12'>12</span>        <span id='13'> 13 </span>            <span id='5'> 5</span><br />
                    |           |           |              |<br />
                    |           |           |              |<br />
                    <span id='0'> 0</span>--------<span id='1'>1</span>----------<span id='2'>2</span>--------<span id='3'>3</span>---------<span id='4'>4</span><br />

                </pre>

            </div>
            <div>
                Path : {start ? (<div>{text}</div>) : null}
                {f_color()}
                {console.log(path.length)}
            </div>
        </div>
    )
   }

export default PathdiscCopy
//.then(data =>console.log(data[data.length-1].location))
{/* <input  placeholder="Answer" type='int' value={start} onChange={(event) => { setStart(event.target.value) }} /><br /> */}