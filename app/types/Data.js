// @flow
import { google, bigquery_v2 as bigqueryV2 } from 'googleapis';
import { ActionStartEventTypeName, TrialEventTypeName } from './Experiment';
import { PowerEventTypeName } from './Device';

const googleauth = require('google-auth-library');

export interface Dataset {
  name: string;
}

export class GenericDataset implements Dataset {
  constructor(name: string) {
    this.name = name;
  }
}

const NullDatasetName = 'NullDataset';
const NullDataset = new GenericDataset(NullDatasetName);
export { NullDataset };

export class BigQueryDataset implements Dataset {
  constructor(name: string) {
    this.name = name;
  }
}

export interface DatasetProvider {
  name: string;
  getDatasets(): Array<Dataset>;
  fuse(dataset: Dataset, fuseOffset: number): void;
}

export const FusedTableName = 'Fused';

export class BigQueryDatasetProvider implements DatasetProvider {
  constructor(credentialsFileRawJSON: Object) {
    this.name = 'BigQueryDatasetProvider';
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

  async getDatasets(): Array<Dataset> {
    const bqdatasets = await this.bigquery.datasets.list({
      projectId: this.projectId,
    });
    const datasets = [];
    bqdatasets.data.datasets.forEach(dataset =>
      datasets.push(new BigQueryDataset(dataset.datasetReference.datasetId)),
    );
    return datasets;
  }

  async fuse(dataset: Dataset, fuseOffset: number): void {
    console.log(fuseOffset);
    const jobQuery = `
WITH windowed_events AS (SELECT
    t.uid as trial_uid,
    t.id as trial_id,
    t.start as trial_start,
    t.timestamp as trial_end,
    a.action_id,
    a.timestamp as action_start,
    LAG(a.timestamp) OVER (PARTITION BY t.id ORDER BY a.timestamp DESC) AS action_end
    FROM \`${this.projectId}.${dataset.name}.${ActionStartEventTypeName}\` AS a
    JOIN \`${this.projectId}.${dataset.name}.${TrialEventTypeName}\` AS t
    ON a.uid = t.uid
    WHERE a.action_id != 0 AND a.timestamp > t.start AND a.timestamp < t.timestamp)
SELECT
    we.trial_id,
    we.action_id,
    pe.*
FROM windowed_events as we 
JOIN \`${this.projectId}.${dataset.name}.${PowerEventTypeName}\` as pe
ON we.trial_uid = pe.uid
WHERE pe.timestamp > we.action_start AND pe.timestamp < we.action_end
ORDER BY action_start ASC`;

    const result = await this.bigquery.jobs.insert({
      projectId: this.projectId,
      requestBody: {
        configuration: {
          query: {
            query: jobQuery,
            useLegacySql: false,
            createDisposition: 'CREATE_IF_NEEDED',
            projectId: this.projectId,
            datasetId: dataset.name,
            destinationTable: {
              projectId: this.projectId,
              datasetId: dataset.name,
              tableId: FusedTableName,
            },
          },
        },
      },
    });
    console.log(result);
  }
}

export class GenericDatasetProvider implements DatasetProvider {
  constructor(name: string) {
    this.name = name;
    this.datasets = [];
  }

  getDatasets(): Array<Dataset> {
    return this.datasets;
  }

  fuse(dataset: Dataset, fuseOffset: number): void {
    console.log(this.name, dataset.name, fuseOffset);
  }
}

const NullDatasetProviderName = 'NullDatasetProvider';
const NullDatasetProvider = new GenericDatasetProvider(NullDatasetProviderName);
export { NullDatasetProvider };
