self.addEventListener('push', event => {
  const data = event.data.json()
  const title = data.title
  const body = data.body
  const icon = data.icon
  const tag = data.tag
  const vibrate = data.vibrate
  const url = data.url
  const options = {
    body,
    icon,
    tag,
    vibrate,
    data: { url },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', event => {
  event.notification.close()

  // Web Push 通知が指定した URL に遷移する
  event.waitUntil(self.clients.openWindow(event.notification.data.url))
})