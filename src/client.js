import * as sapper from "@sapper/app";

sapper.start({
  target: document.body,
});

// Unregister all service workers from client's devices
// Kuch nahi kar rahe vo apart from caching which I don't
// really need and the browsers are already doing their bit
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}
