import React from 'react'

function DisplayPage() {
    return (
        <div>
            <div>
            <form>
            <label for="fname">Starting Location:</label><br />
            <input type="text" id="fname" name="fname" /><br />
            <label for="lname">Ending Location:</label><br />
            <input type="text" id="lname" name="lname" />
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
        </div>
    )
}

export default DisplayPage
