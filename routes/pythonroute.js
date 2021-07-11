const express = require('express');
const pythonroutes = express.Router(); //express router
const { spawn } = require('child_process');

pythonroutes.get('/', (req, res) => {
    var dataToSend;
    // spawn new child process to call the python script
    const pythonfile = spawn('python', ['./pythonScripts/script1.py']);
    // const pythonfile = spawn('python', ['./pythonScripts/script2.py']);
    // collect data from script
    pythonfile.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    pythonfile.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });

})

module.exports = pythonroutes