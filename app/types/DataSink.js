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

  cilent: bigqueryV2.Bigquery;

  constructor(name: string, credentialsFileRawJSON: JSON) {
    this.name = name;

    const client = googleauth.auth.fromJSON(credentialsFileRawJSON);
    client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    // set the global options to use this for auth
    google.options({
      auth: client,
    });
    this.client = new bigqueryV2.Bigquery({}, google);
  }

  upload(buffer: Buffer): void {
    console.log(this.name, buffer);
  }
}

const NullDataSinkName = 'Null';
const NullDataSink = new GenericDataSink(NullDataSinkName);
function isNullDataSink(sink: DataSink) {
  return sink.name === NullDataSinkName;
}
export { NullDataSink, isNullDataSink };
