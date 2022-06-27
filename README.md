# Module federation learning

In this version of the system, I've created two apps using `create-mf-app` and adjusted them slightly. I had the main app implement a tracking function, and federated the module containing that function to the first party app. The first party app then has a button with a click event that loads the federated module and calls that `initCustomTracking` functions.

### [Basics](./notes/basics.md)

### [Types](./notes/types.md)

### [Versioning](./notes/versioning.md)

## Commentary

One thing I do a lot and also encourage when talking about Module Federation is to check out the built bundles. To make this easier for this repo, I've adjusted the webpack config a little so they're easier to read, and also included the `/dist` folder. It was previously (as it normally is) added to `.gitignore`

We can see that the [`dist/remoteEntry.js`](https://github.com/robertandreimoldoveanu/mf-learning/blob/049d1a5c48ace13ae785c798c66abca98ca32e96/main-app/dist/remoteEntry.js#L9) file created by the main-app has a little bit of code. Let's check up some of it:
```js
var moduleMap = {
	"./tracking": () => {
		return __webpack_require__.e("tracking_index_ts").then(() => (() => ((__webpack_require__(284)))));
	}
};
var get = (module, getScope) => {
  ...
};
var init = (shareScope, initScope) => {
  ...
};
```

Webpack defined a `moduleMap` based on what we want to expose, which is just a map of a module name and what bundle to require when the module is loaded. The following functions, called `get` and `init` are important, because they are exported and used by [`first-party-app/dist/main.js`](https://github.com/robertandreimoldoveanu/mf-learning/blob/049d1a5c48ace13ae785c798c66abca98ca32e96/first-party-app/dist/main.js#L203) in order to consume that remote module. 

I'll admit I'm not particularly eager of understanding completely what webpack does underneath, but I got a general broad picture of what it does: 
* it loads the entry in a `<script>` element and then maps the promise to load that module to the `mainApp` global variable exposed by the remoteEntry. [lines here](https://github.com/robertandreimoldoveanu/mf-learning/blob/049d1a5c48ace13ae785c798c66abca98ca32e96/first-party-app/dist/main.js#L18)
* a function to load the remotes and calls the `get` function we talked above is defined [here](https://github.com/robertandreimoldoveanu/mf-learning/blob/049d1a5c48ace13ae785c798c66abca98ca32e96/first-party-app/dist/main.js#L217) and one that initialises the shared scopes by calling the `init` function from above [here](https://github.com/robertandreimoldoveanu/mf-learning/blob/049d1a5c48ace13ae785c798c66abca98ca32e96/first-party-app/dist/main.js#L267)
