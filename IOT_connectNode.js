module.exports = function(RED) {
    const express = require('express');
    const app = express();
    //const request = require('request');
    const PORT = 17380
    var postJson = ""
    ///var getJson = ""
    app.use(express.json());

    app.post('/platform_set', (req, res) => {
        res.send(req.body + + "ds");
    });

    app.get('/platform_set', (req, res) => {
        res.send(postJson);
    });

    app.listen(PORT, () => {
        const currentDate = new Date();
        console.log(currentDate.getDate() + " " + currentDate.toLocaleString('default', { month: 'short' }) + " " + ("0" + currentDate.getHours()).slice(-2) + ":" + ("0" + currentDate.getMinutes()).slice(-2) + ":" + ("0" + currentDate.getSeconds()).slice(-2) + ' - [info] Applied Robotics preset');
    });

    function IOT_connectNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.name = config.name;
        node.ip = config.ip;
   
        this.on('input', function(msg) {
            var jsonMSG = JSON.stringify(msg.payload);
            postJson = msg.payload
            node.send(postJson)
            //node.status({fill:"green", shape:"dot", text:"connected"});
        });
    }

    RED.nodes.registerType("Send", IOT_connectNode);
};