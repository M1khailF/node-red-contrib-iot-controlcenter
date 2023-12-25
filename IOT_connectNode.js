module.exports = function(RED) {
    const express = require('express');
    const app = express();
    const request = require('request');
    const PORT = 17380
    var postJson = ""
    const { random } = require('lodash');
    // const my_random = require('lodash.random');
    ///var getJson = ""
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.post('/platform_set', (req, res) => {
        const message = req.body.message;

        // Display the received message on the HTTP page
        res.send(`<h1>Received Message: ${message}</h1>`);
        // const jsonData = req.body;
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(jsonData));
        // console.log(JSON.stringify(jsonData));
    });

    app.get('/platform_set', (req, res) => {
        const message = req.body.message;

        // Display the received message on the HTTP page
        res.send(postJson);
        // const jsonData = req.body;
        // res.setHeader('Content-Type', 'application/json');
        // res.send(JSON.stringify(jsonData));
        // console.log(JSON.stringify(jsonData));
    });

    app.listen(PORT, () => {
        const currentDate = new Date();
        console.log(currentDate.getDate() + " " + currentDate.toLocaleString('default', { month: 'short' }) + " " + ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2) + ":" + ("0" + currentDate.getSeconds()).slice(-2) + ' - [info] Applied Robotics preset');
    });

    function displayMessage(message, ms, ns) {
        setTimeout(() => {
            postJson = message;
        }, ms + ns);
      }
    
    function IOT_connectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.ip = config.ip;
   
        this.on('input', async function(msg) {
            var jsonMSG = JSON.stringify(msg.payload);
            const randomNumber = random(0, 100);  
            node.send(postJson);

            displayMessage(msg.payload, random(0, 100), random(0, 10));
        });
    }

    RED.nodes.registerType("Send", IOT_connectNode);
};