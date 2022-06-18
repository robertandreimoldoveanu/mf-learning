# Module federation basics

## Why

Used for runtime dependencies:

- Microfrontends - the shell app pulls each remote from a separate deployment place. This leads to autonomous teams that deploy code independently and work on isolated codebases. Some great resources on microfrontends: [one](https://martinfowler.com/articles/micro-frontends.html), [two](https://micro-frontends.org/)
- Libraries - You have a new module for tracking user events that's constantly changing and improving. Because of this, you don't want to keep it as a build time dependency and upgrade it with every change.
- Code sharing - You built the main app of your business, e.g.: a course-watching app, and now want to expand it by adding a classroom app. You leverage microfrontends and deploy them independently, but you'll need to use some of the same logic you wrote for the courses app: auth module, progress tracking and the lecture video-player. Instead of spending time extracting those components, you simply federate them. (_Note: if you're using different frameworks, simple federation might not do the trick and you might need to use a common interface such as [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)_)

## How

Webpack bundles your code base into multiple modules, each having dependencies among the others, and one entry point (or, perhaps [multiple entry points](https://webpack.js.org/concepts/output/#multiple-entry-points)). Module federation allows you to create a special type of entry point, most commonly called a `remoteEntry`, that contains instructions on how to expose a piece of code from your application into another remote application. The consumer will have to instruct webpack to pull that remote entry and use it as a module internally. Afterwards, your code can use the remote dependency just as a normal one. Additionally, if the remote module and your host app use some of the same external dependencies (both use lodash or both are angular apps, for example) they can use the same instance of the module containing this external dependency, to reduce duplication. This way, when the remote entry is loaded, it can decide (by some instructions you specify) to either consume the same module as the host or pull its own.

## What

On the concrete side, this is implemented using the `ModuleFederationPlugin`, and the simplest form is the one described in the two projects added here, `main-app` and `first-party-app`. We have here a scenario where we developed first our main app, and when another team starts working on a first party app, they want to use the same user event tracking mechanism. Instead of investing time in extracting that code and maintaing a separate package for it, we simply expose it.

```
// main-app/webpack.config.js, server running on port 3002
new ModuleFederationPlugin({
  name: "mainApp", // one side note, the name cannot contain dashes '-', so be careful when naming
  filename: "remoteEntry.js", // though, this could be called literally anything
  exposes: {
    "./tracking": './tracking/index.ts'
  },
}),
```

Here, we're telling our main app to expose a special type of entry file called `remoteEntry.js` that exposes the tracking module and the path to that module Now, we want to consume this, so on the first party app we have a config that looks like this:

```
// first-party-app/webpack.config.js, server running on port 3003
new ModuleFederationPlugin({
  name: "first-party-app",
  filename: "remoteEntry.js",
  remotes: {
    "mainApp": "mainApp@http://localhost:3002/remoteEntry.js"
  },
}),
```

And now we can simply import that tracking service:

```
import { initCustomTracking } from "mainApp/tracking";
initCustomTracking().then(() => {
  console.log('Tracking from the mainApp initialised on remote!');
  // ...
});
```

Or have it dynamically as such:

```
document.querySelector(".load-tracking")?.addEventListener(
  "click",
  () => {
    import("mainApp/tracking").then((federatedModule) => {
      // I know, nested promises are bad practice
      federatedModule.initCustomTracking().then(() => {
        console.log('Tracking from the mainApp initialised on remote!');
        // ...
      });
    });
  },
  { once: true }
);
```

One note here is that, if you're using typescript, you'll have to create an ambient declaration for the module. You can read more about how to include proper typings [here](./types.md).

I have to give a shoutout to [Jack Herrington](https://github.com/jherr) who created the awesome tool `create-mf-app` that I used to initially generate these projects.
