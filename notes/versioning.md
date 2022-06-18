# versioning the remote

### if we version it, why not just use a library?

Because it's easier to work on an app and change a module that is to be exposed than to extract it and maintain it in a separate lib.

Ownership of libs can also get fuzzy, while ownership of apps is always clear.

### using release channels

We could use release channels to ensure that the consumers who want only a stable version of the remote could have them, and that consumers who want to consume the latest version can do that as well.

We could also set up workflows in place that run sanity checks (or even full on integration tests) when a new version is released and mark the release as `stable` if that's the case, so any consumer is automatically using that.

### CDN vs dedicated registry/cloud function

Using a CDN/storage, we might only specify the exact versions.

If we use a dedicated registry (unpkg or azure package feed) we might benefit from semver as well and ensure better version upgrades.

We could also use some sort of cloud function, or an nginx routing layer, that performs the semver parsing and redirecting to the correct version URL.

**note:** downside here is that we will need to start _actually publishing_ the apps that federate content. This means we also need to establish a cadence (the spectrum is broad, from publishing once per release, to once per sprint, to once per `merge` commit into the main release branches and even on demand).

## To version or not the version the federated remote?

### Pros

- auto-updates when smaller or non-breaking changes are made to the remote content;
- almost zero chances that a host app consuming federated modules can break;

### Cons

- the overhead of setting up or using a dedicated registry or a function that parses the semver;
- we might not always benefit from the newest changes on the remote;
- the overhead of managing releases and publishing packages that we normally just build and deploy statically
