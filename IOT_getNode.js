module.exports = function(RED) {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const PORT = 17381

    app.use(bodyParser.json());

    app.post('/platform_get', (req, res) => {
        const json = req.body;
        //console.log(json);
        nodeRed.send({payload: json});
        res.send('Success');
    });

    app.listen(PORT, () => {
        const currentDate = new Date();
        console.log(currentDate.getDate() + " " + currentDate.toLocaleString('default', { month: 'short' }) + " " + ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2) + ":" + ("0" + currentDate.getSeconds()).slice(-2) + ' - [info] IOT Control_center');
    
    });

    function IOT_getNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        nodeRed = this;
        node.name = config.name;
        node.ip = config.ip;
   
        this.on('input', function(msg) {
            var jsonMSG = JSON.stringify(msg.payload);
            postJson = msg.payload
            //node.status({fill:"green", shape:"dot", text:"connected"});
        });
        
        this.on('output', function(msg) {
            msg.payload = "getJson";
            node.send(msg);
        });

        //setInterval(send_debug, 1000);
    }

    function send_debug(){
        nodeRed.send({payload: getJson});
    }

    RED.nodes.registerType("Get", IOT_getNode);
};