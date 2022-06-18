export function initCustomTracking() {
  return new Promise<void>((resolve) => {
    // setup some listeners
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        console.log("Browser tab is hidden");
      } else {
        console.log("Browser tab is visible");
      }
    });

    // perform some registration logic
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
