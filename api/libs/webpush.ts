import webPush from 'web-push'
import config from 'config'

// 一度のみ払い出しすれば良いので本番は固定のものを使う
const vapidKeys = {
  publicKey: config.get('vapidPublicKey') as string,
  privateKey: config.get('vapidSecretKey')  as string,
}

webPush.setVapidDetails(
  'mailto:test@gmail.com', // 第一引数は'mailto:～'というフォーマットが必須
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

export function getVAPIDKey(): string {
  return vapidKeys.publicKey
}

type WebPushPayload = {
  title: string;
  body?: string;
  icon: string;
  url: string;
  tag?: string;
  vibrate?: number[];
}
export async function sendPush(subscription: webPush.PushSubscription, payload: WebPushPayload): Promise<void> {
  await webPush.sendNotification(subscription, JSON.stringify(payload))
}