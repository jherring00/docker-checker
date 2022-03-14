var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
const express = require('express')
const app = express()

app.get('/', (req, res)=> {
    var containerList = {containers: []}
    docker.listContainers((err, containers) =>{
        containers.forEach((containerInfo)=>{
            containerList.containers.push(containerInfo)
        });
        res.set({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        res.send(containerList)
    })
})
app.get("/summary", (req,res)=> {
    var containerList = { containers: []}
    docker.listContainers((err, containers)=> {
        containers.forEach((container)=> {
            containerList.containers.push({
                containerId: container.Id,
                image: container.Image,
                state: container.State,
                status: container.Status,
                port: container.Ports[0].PrivatePort +'/'+container.Ports[0].Type,
                name: container.Names[0].substring(1),
                })
        })
        res.set({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        res.send(containerList)
        })
})

app.get("/inspect", (req,res)=> {
    var containerList = {containers: []}
    if(req.query.containerName) {
        console.log(req.query.containerName)
        docker.listContainers((err, containers)=> {
            containers.forEach((container)=> {
                console.log(container.Names[0].substring(1))
                if(container.Names[0].substring(1)===req.query.containerName) {
                    containerList.containers.push(container)
                    res.set({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
                    res.send(container)
                }
            })
        })
    }
})

app.listen(3030,"localhost");


