// show a notification after 15 seconds (the notification
// permission must be granted first)
// setTimeout(() => {
//   Notification.requestPermission(function(result) {
//     if (result === 'granted') {
//       navigator.serviceWorker.ready.then(function(registration) {
//         registration.showNotification('Vibration Sample', {
//           body: 'test',
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//         })
//       })
//     }
//   })
// }, 15000)
