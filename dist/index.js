function sendForm ( event ) {
  return _entry.sendForm ( event ) ;
};
function doPost ( event ) {
  return _entry.doPost ( event ) ;
};
"use strict";
var _entry = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    doPost: () => doPost,
    sendForm: () => sendForm
  });

  // src/printHelloWorld.ts
  var printHelloWorld = (emailAddress) => {
    console.log(`Hello ${emailAddress}`);
  };

  // src/index.ts
  function sendForm(event) {
    let gwsLoginEmail = event.response.getRespondentEmail();
    printHelloWorld(gwsLoginEmail);
  }
  function doPost(event) {
  }
  return __toCommonJS(index_exports);
})();
