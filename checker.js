var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var containerList = {names: []}
docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
        containerList.names.push(containerInfo.Names[0].substring(1))
    });
});
var http = require('http');
http.createServer(((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify(containerList), null, 3 )
})).listen(8080)




