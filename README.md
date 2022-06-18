# Module federation learning

In this version of the system, I've created two apps using `create-mf-app` and adjusted them slightly. I had the main app implement a tracking function, and federated the module containing that function to the first party app. The first party app then has a button with a click event that loads the federated module and calls that `initCustomTracking` functions.

### [Basics](./notes/basics.md)

### [Types](./notes/types.md)

### [Versioning](./notes/versioning.md)
