import { Request, Response } from 'express'
import { getVAPIDKey, sendPush } from '../libs/webpush'
import { AuthRequest } from '../../types/interface'

export async function getWebPushKey(req: Request, res: Response): Promise<Response | undefined> {
  return res.json(getVAPIDKey())
}

export async function createSubscription(req: AuthRequest, res: Response): Promise<Response | undefined> {
  const subscriptionJson = req.body.subscription

  // TODO: ここでsubscriptionを保存する
  const fullUrl = req.protocol + '://' + req.get('host')
  sendPush(JSON.parse(subscriptionJson), {
    title: 'Gatsbyサンプル',
    body: `${req.user?.name ? `${req.user.name}さん`: ''}登録ありがとうございます`,
    icon: '/icons/icon-96x96.png',
    url: fullUrl,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  })
  return res.json()
}