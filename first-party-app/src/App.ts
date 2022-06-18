// import { initCustomTracking } from "mainApp/tracking";
import "./index.css";

// import('')

document.querySelector(".load-tracking")?.addEventListener(
  "click",
  () => {
    import("mainApp/tracking").then((federatedModule) => {
      federatedModule.initCustomTracking().then(() => {
        const p = document.createElement("p");
        p.innerText = "on remote, we have tracking from host";
        document.querySelector(".container")!.appendChild(p);
      });
    });
  },
  { once: true }
);
