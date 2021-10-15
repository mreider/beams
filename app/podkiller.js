const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

const targetNamespaceName = 'beams';
const targetDeploymentName = 'calculations';
const numberOfTargetReplicas = 1;

async function scale(namespace, name, replicas) {
  // find the particular deployment
  const res = await k8sApi.readNamespacedDeployment(name, namespace);
  let deployment = res.body;

  // edit
  deployment.spec.replicas = replicas;

  // replace
  await k8sApi.replaceNamespacedDeployment(name, namespace, deployment);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
const rndMinutes = randomIntFromInterval(11, 40);
const rndMoreMinutes = randomIntFromInterval(41, 59);

function tick() {
    //get the mins of the current time
    var mins = new Date().getMinutes();
    if (mins == rndMinutes) {
        scale(targetNamespaceName, targetDeploymentName, numberOfTargetReplicas);
    }
    if (mins == rndMoreMinutes){
        scale(targetNamespaceName, targetDeploymentName, 3);  
    }
  }
  
setInterval(tick, 1000);




