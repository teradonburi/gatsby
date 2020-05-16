import webPush from 'web-push'

// 一度のみ払い出しすれば良いので本番は固定のものを使う
const vapidKeys = process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY ?
{
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
}
: webPush.generateVAPIDKeys()

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