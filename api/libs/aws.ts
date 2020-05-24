import AWS from 'aws-sdk'

if (process.env.NODE_ENV !== 'production') {
  AWS.config.logger = console // 通信のデバッグ用
}

const accessKeyId = process.env.AWS_ACCESS_KEY_ID // IAMユーザの認証情報の「アクセスキーID」から確認できます
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY // IAMユーザのシークレットアクセスキー。アクセスキーを作ったときだけ見れるやつです

class S3 {
  private s3: AWS.S3
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: 'ap-northeast-1',
    })
  }

  async getSignedUploadUrl(fileName: string, fileType: string, bucketName: string): Promise<string | null> {

    const s3Params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
    }

    const result = await new Promise<{signedUrl?: string; error?: Error}>((resolve, reject) => {
      this.s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
          return reject({error: err})
        }
        resolve({signedUrl: data})
      })
    }).catch(error => error)

    if (result.error) {
      console.error(result.error)
      return null
    }

    return result.signedUrl
  }
}

export const s3 = new S3()
