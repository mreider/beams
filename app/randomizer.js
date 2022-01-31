const k8s = require('@kubernetes/client-node');
const {transports, createLogger, format} = require('winston');
const schedule = require('node-schedule');
const logger = winston.createLogger({
	format: format.combine(
		format.timestamp(),
		format.json()
	),
    transports: [
        new winston.transports.Console()
    ]
});

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

const scale_down = new schedule.RecurrenceRule();
scale_down.hour = [9,14,21];
scale_down.minute = 30;

const scale_up = new schedule.RecurrenceRule();
scale_up.hour = [10,15,22];
scale_up.minute = 1;

const scale_down_time = schedule.scheduleJob({hour: scale_down.hour, minute: scale_down.minute}, function() {
  scale("down");
});

const scale_up_time = schedule.scheduleJob({hour: scale_up.hour, minute: scale_up.minute}, function() {
  scale("up");
});

async function scale(direction) {
  // find the particular deployment
  const res = await k8sApi.readNamespacedDeployment('calculations', 'beams');
  let deployment = res.body;

  if (direction == "up"){
    deployment.spec.template.spec.containers[0].resources.limits.cpu = "100m";
    logger.info("scaled up");
  }

  if (direction == "down"){
    deployment.spec.template.spec.containers[0].resources.limits.cpu = "10m";
    logger.info("scaled down");
  }
  
  // replace
  await k8sApi.replaceNamespacedDeployment('calculations', 'beams', deployment);
}




