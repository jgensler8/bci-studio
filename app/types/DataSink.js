// @flow
import { google, bigquery_v2 as bigqueryV2 } from 'googleapis';
import { Buffer } from './Buffer';

const googleauth = require('google-auth-library');

export interface DataSink {
  name: string;

  upload(buffer: Buffer): void;
}

export class GenericDataSink implements DataSink {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  upload(buffer: Buffer): void {
    console.log(this.name, buffer);
  }
}

export class GCPDataSink implements DataSink {
  name: string;

  bigquery: bigqueryV2.Bigquery;

  projectId: string;

  constructor(name: string, credentialsFileRawJSON: Object) {
    this.name = name;
    this.projectId = credentialsFileRawJSON.project_id;

    const client = googleauth.auth.fromJSON(credentialsFileRawJSON);
    client.scopes = [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/bigquery',
    ];
    // TODO: might not the be best to have this global if multiple projects?
    // set the global options to use this for auth
    google.options({
      auth: client,
    });
    this.bigquery = new bigqueryV2.Bigquery({}, google);
  }

  async upload(buffer: Buffer): void {
    console.log(this.name, buffer);

    // create dataset
    try {
      await this.bigquery.datasets.get({
        projectId: this.projectId,
        datasetId: this.name,
      });
    } catch (e) {
      await this.bigquery.datasets.insert({
        projectId: this.projectId,
        requestBody: {
          datasetReference: {
            datasetId: this.name,
          },
        },
      });
    }

    // get events
    const events = buffer.getEvents();
    if (events.length === 0) {
      return;
    }

    // create schema from first event
    // [{"type":"STRING","name":"Name"},{"type":"INTEGER","name":"Age"},{"type":"FLOAT","name":"Weight"},{"type":"BOOLEAN","name":"IsMagic"}]
    const firstEvent = events[0];
    const schema = [
      {
        type: 'TIMESTAMP',
        name: 'timestamp',
      },
    ];
    firstEvent.values.forEach(field =>
      schema.push({
        type: field.type,
        name: field.name,
      }),
    );

    // create table from schema
    try {
      await this.bigquery.tables.get({
        projectId: this.projectId,
        datasetId: this.name,
        tableId: firstEvent.type,
      });
    } catch (e) {
      await this.bigquery.tables.insert({
        projectId: this.projectId,
        datasetId: this.name,
        requestBody: {
          id: firstEvent.type,
          tableReference: {
            tableId: firstEvent.type,
          },
          schema: {
            fields: schema,
          },
        },
      });
    }

    // upload rest of data
    const records = [];
    /* eslint-disable no-restricted-syntax */
    for (const event of buffer.getEvents()) {
      /* eslint-enabled no-restricted-syntax */
      const record = {
        json: {
          timestamp: new Date(event.timestamp).toISOString(),
        },
      };
      /* eslint-disable no-return-assign */
      event.values.forEach(field => (record.json[field.name] = field.value));
      /* eslint-disable no-return-assign */
      records.push(record);
    }
    const result = await this.bigquery.tabledata.insertAll({
      projectId: this.projectId,
      datasetId: this.name,
      tableId: firstEvent.type,
      requestBody: {
        rows: records,
      },
    });
    console.log(result);
  }
}

const NullDataSinkName = 'Null';
const NullDataSink = new GenericDataSink(NullDataSinkName);
function isNullDataSink(sink: DataSink) {
  return sink.name === NullDataSinkName;
}
export { NullDataSink, isNullDataSink };
