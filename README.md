# BCI Studio

BCI Studio is a Desktop Application built to:

- [Run Custom Experiments](#Custom-Experiments) designed in React.js and recorded with popular consumer EEG headsets.
- [Manage EEG Data](#Manage-EEG-Data) using popular storage options offered by Cloud Providers.
- [Train and Deploy BCI Models](#Training-And-Deploying-BCI-Models) using TensorFlow.

## Getting Started

You don't need an EEG Headset to get started with BCI Studio!
BCI Studio comes prepacakged with a "Fake" Device that generates events every 250ms which is a similar rate to the EPOC+.
With this, you should be able to explore a full end to end experiment and test the data storage and machine learning features.

## Pre-Packaged Experiments

- Screen Swap (breifly show a Green screen for ~1 second)

## Custom-Experiments

**Work in Progress**

In the current state of this project, your experiments have to be built with the application itself.
To build your own Experiment, you'll need to create two things.

1. React Components for various parts of your UI.
2. Implementations of an `Event`.
3. Possibly implement a `Trial` or an `Experiment`. The provided implementations are likely sufficient for most use cases.

Take a look at [`./app/types`](./app/types) for more information on the current implementation details.

After, you will have to modify parts of BCI Studio that decide the "default" experiment. This functionality isn't modularized quite yet so keep track of the project before making serious modifications to your own copy of the application.

## Manage EEG Data

**Work in Progress**

The functionality proposed here was enough to get an minimum product working but very likely not finalized as there are some clear drawbacks.

After creating an `Experiment`, you'll have to merge the various events that are created so that you have data that can be fed to a statistical model.
BCI Studio has the concept of fusing data.
This concept focuses on the columnar EEG data and maps events on top of these events.
**The one drawback is that events don't yet specify the window of EEG events that they should fuse with.**
By default, fusion maps the current state of the world onto the EEG data.
This means that fluxuations in events are the only way to create the fusion windows.
Because our brains take some time to react the exact state of the world, there is some value in augmenting the fusion time so that EEG events are labeled with what happened in the past.
At the time of this commit, augmenting the fusion time isn't implemented.

## Training And Deploying BCI Models

**Work in Progress**

This part of the project is executed manually until the previous steps have clear APIs.

1. Download the default machine learning model here: TODO (based on [the cloudml-template](https://github.com/GoogleCloudPlatform/cloudml-samples/tree/master/cloudml-template))
2. Locate your fusion table in your Cloud Provider.
3. Download data from the fusion table as `csv` and place in the `./data` folder.
4. Create two copies of your file: `train-data-<something>.csv` and `valid-data-<something>.csv`.
5. Optional: update columns specific to your device or experiment
6. `../scripts/local-train.sh`
7. Modify the sample data `./data/new-data.json`
8. `../scripts/local-predict.sh`

## About BCI Studio

- Based on [react-electron-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).
- Written in [Flow](https://flow.org/en/docs/).
- Uses [Redux](https://redux.js.org/introduction/motivation) for state management.
- UI build with [material-ui](https://material-ui.com/layout/grid/)

## Developing BCI Studio

To run locally:

```
yarn dev
```

**Note: sometimes webpack will serve "old" versions of your code and the application doesn't reflect the most recent "save." After changing code, you may have to refresh the Electron app (Command + R)**

To run pre-commit checks (style linting):

```
npm run -s precommit
```

## Other Links

- [Emotiv Documentation](https://emotiv.github.io/cortex-docs/#sessions)
