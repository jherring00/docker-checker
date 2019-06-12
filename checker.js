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
        containerList.containers.forEach((container)=>
        {
            if(container.Names[0].substring(1)===q.inspect)
            {
                returnList.containers.length=0
                returnList.containers.push(container)
            }
        })
    }
    else if(q.listNames==='true')
    {
        containerList.containers.forEach((container)=>
        {
            returnList.containers.length=0
            returnList.containers.push(container.Names[0].substring(1))
        })
    }
    res.end( JSON.stringify(returnList), null, 3 )
})).listen(3000,'localhost')




