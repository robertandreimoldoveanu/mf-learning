# Module Federation types

notes, ideas and solutions for a typed module federation experience

## Quick workflows to constantly update types

In order to ensure ease of use and enforcement (in case of breaking changes), we need to have fast iterations and automations to help us.
How should this look like for **non-versioned usage of live remote**?

- we have a script that extracts the federated types (or use [the lib from pixability](https://www.npmjs.com/package/@pixability-ui/federated-types));
- every time we merge code on the **remote** we run that job and check if the types have changed;
- if they did, we publish a new version;
- on the **consumer/host** side, we need to ensure that every time the app is built, we pull the latest types, so if a breaking change was introduced that crashes the host, the pipeline is stopped early.
