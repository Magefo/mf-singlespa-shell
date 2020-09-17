import { registerApplication, start, mountRootParcel } from "single-spa";

// Microfrontend 1

const mfAngularEl = document.getElementById("mf-angular");
const parcelProps1 = { domElement: mfAngularEl, customProp1: "foo" };
const parcel1 = mountRootParcel(
  () => System.import("mf-angular"),
  parcelProps1
);

// Microfrontend 2

const mfAngularEl2 = document.getElementById("mf-angular-2");
const parcelProps2 = { domElement: mfAngularEl2, customProp1: "foo" };
const parcel2 = mountRootParcel(
  () => System.import("mf-angular-2"),
  parcelProps2
);

parcel2.mountPromise.then(() => {
  parcelProps2.customProp1 = "bar";
  parcel2.update(parcelProps2);
});

start();

const addEvent = new CustomEvent("mf-shell-event", {
  detail: { event: "add" },
});

const subtractEvent = new CustomEvent("mf-shell-event", {
  detail: { event: "subtract" },
});

window.addEventListener("mf-angular-event", handleEvent);
window.addEventListener("mf-angular-2-event", handleEvent);

function handleEvent({ detail }) {
  if (detail.event === "add") {
    window.dispatchEvent(addEvent);
  }
  if (detail.event === "subtract") {
    window.dispatchEvent(subtractEvent);
  }
}

/*registerApplication(
  'mf-angular',
  () => System.import('mf-angular'),
  location => location.pathname.startsWith('/')
);

start();*/
