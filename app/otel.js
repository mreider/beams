/* opentelemetry.js */
const fs = require("fs");

const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { AlwaysOnSampler } = require("@opentelemetry/core");

const propertiesReader = require('properties-reader');

const OTLPoptions = {
    url: process.env.APIURL, //TODO Replace <URL> to your SaaS/Managed-URL as mentioned in the next step
    headers: {
        Authorization: "Api-Token " + process.env.APITOKEN //TODO Replace <TOKEN> with your API Token as mentioned in the next step
    },
};

dtmetadata = new Resource({})
for (let name of ['dt_metadata_e617c525669e072eebe3d0f08212e8f2.properties', '/var/lib/dynatrace/enrichment/dt_metadata.properties']) {
  try {
    dtmetadata = dtmetadata.merge(new Resource(name.startsWith("/var") ? propertiesReader(name).getAllProperties() : propertiesReader(fs.readFileSync(name).toString()).getAllProperties()))
  } catch { }
}

const otlpExporter = new OTLPTraceExporter(OTLPoptions);

const sdk = new opentelemetry.NodeSDK({
    sampler: new AlwaysOnSampler(),
    traceExporter: otlpExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'nodejs-quickstart', //TODO Replace with the name of your application
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.1', //TODO Replace with the version of your application
    }).merge(dtmetadata),
});


sdk.start()