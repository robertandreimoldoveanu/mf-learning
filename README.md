# Module federation learning

In this version of the system, I've created two apps using `create-mf-app` and adjusted them slightly. I had the main app implement a tracking function, and federated the module containing that function to the first party app. The first party app then has a button with a click event that loads the federated module and calls that `initCustomTracking` functions.

### [Basics](./notes/basics.md)

### [Types](./notes/types.md)

### [Versioning](./notes/versioning.md)

## Note

One thing I do a lot and also encourage when talking about Module Federation is to check out the built bundles. To make this easier for this repo, I've adjusted the webpack config a little so they're easier to read, and also included the `/dist` folder. It was previously (as it normally is) added to `.gitignore`

**Important**: DO NOT use those webpack settings in production builds.
