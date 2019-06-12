var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var url = require("url")
var containerList = { containers: [] }
var returnList = { containers: [] }

docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
        containerList.containers.push(containerInfo)
    });
});
var http = require('http');
http.createServer(((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    var q = url.parse(req.url, true).query

    if(q.inspect) {
        returnList.containers.length=0
        containerList.containers.forEach((container)=>
        {
            if(container.Names[0].substring(1)===q.inspect)
            {
                returnList.containers.push(container)
            }
        })
    }
    else if(q.listNames==='true')
    {
        returnList.containers.length=0
        containerList.containers.forEach((container)=>
        {
            returnList.containers.push(container.Names[0].substring(1))
        })
    }
    else if(q.ls==='true')
    {
        returnList.containers.length=0
        containerList.containers.forEach((container)=>
        {
            returnList.containers.push(

                {
                    containerId: container.Id,
                    image: container.Image,
                    command: container.Command,
                    status: container.Status,
                    port: container.Ports[0].PrivatePort +'/'+container.Ports[0].Type,
                    name: container.Names[0].substring(1),
                })
        })
    }
    res.end( JSON.stringify(returnList), null, 3 )
})).listen(3000,'172.16.1.161')




