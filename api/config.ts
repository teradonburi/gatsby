// TODO: dotenvなどで本番環境は必ず設定すること
export const secret = process.env.SECRET || 'secret'
export const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BKbVIkcpQIyg6MKFzAnIaNwTNxCmrOrSBcuwivivXa4sYlNbR4LRWHtfnYnab_O4Ch5RazQdJmK6nB4a7F0Aok0'
'fk2m8w1xtcyUv_nUNjd8Z4Y79GQjht3RViwdUDVAvCE'
export const vapidSecretKey = process.env.VAPID_PRIVATE_KEY || 'fk2m8w1xtcyUv_nUNjd8Z4Y79GQjht3RViwdUDVAvCE'