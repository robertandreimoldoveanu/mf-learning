import { initCustomTracking } from "@tracking";
import "./index.css";

initCustomTracking().then(() => {
  console.log("tracking is on");
  const p = document.createElement("p");
  p.innerText = "we have tracking";
  document.querySelector("#app").appendChild(p);
});
