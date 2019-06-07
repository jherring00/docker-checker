var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
        console.log(containerInfo.Names[0].substring(1))
    });
});
