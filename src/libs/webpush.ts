import { AxiosInstance } from 'axios'
let client: AxiosInstance
let vapidPublicKey: string

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function sendSubscription(): void {

  // 通知承認要求
  Notification.requestPermission(permission => {
    if (permission == 'granted') {
      window.navigator.serviceWorker.getRegistration().then(registration => {
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

        return registration?.pushManager.getSubscription().then((subscription) => {

          return registration?.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          }).catch(() => {
            // ここに来るのはsubscription登録済みでサーバのVAPIDキーが更新された場合、主に開発時など
            return subscription?.unsubscribe().then(() => {
              // 登録解除が成功したら再作成
              return registration?.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
              })
            })
          })
        })
        .then((subscription) => {
          client.post('/api/webpush/subscription', {subscription: JSON.stringify(subscription)})
        })
      })
    }
  })
}

export function init(axios: AxiosInstance): void {
  client = axios

  if (typeof window !== 'undefined') {
    client?.get('/api/webpush/key')
      .then((res) => res.data)
      .then((data) => vapidPublicKey = data)
  }
}