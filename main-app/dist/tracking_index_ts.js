"use strict";
(self["webpackChunkhost"] = self["webpackChunkhost"] || []).push([["tracking_index_ts"],{

/***/ 284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initCustomTracking": () => (/* binding */ initCustomTracking)
/* harmony export */ });
function initCustomTracking() {
  return new Promise(function (resolve) {
    // setup some listeners
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        console.log("Browser tab is hidden");
      } else {
        console.log("Browser tab is visible");
      }
    }); // perform some registration logic

    setTimeout(function () {
      resolve();
    }, 1000);
  });
}

/***/ })

}]);