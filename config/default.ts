export = {
  secret: process.env.SECRET || 'secret',
  mongoDB: process.env.MONGO_DB || 'mongodb://localhost/gatsby-template',
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY || 'BKbVIkcpQIyg6MKFzAnIaNwTNxCmrOrSBcuwivivXa4sYlNbR4LRWHtfnYnab_O4Ch5RazQdJmK6nB4a7F0Aok0',
  vapidSecretKey: process.env.VAPID_PRIVATE_KEY || 'fk2m8w1xtcyUv_nUNjd8Z4Y79GQjht3RViwdUDVAvCE',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
}