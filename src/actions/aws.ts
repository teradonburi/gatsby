import axios, { AxiosInstance } from 'axios'
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const awsFactory = actionCreatorFactory('AWS')
const awsAsyncFactory = asyncFactory(awsFactory)

export const getSignedUploadUrl = awsAsyncFactory<{file: File; path?: string}, {signedUrl: string}, Error>(
  'GETSIGNEDUPLOADURL',
  (params, dispatch, getState, client: AxiosInstance) => {
    const file = params.file
    const fileName = params.path || file.name

    return client
      .get('/api/signedUrl/upload', {params: {fileName, fileType: file.type}})
      .then(res => res.data)
	}
)

export const uploadFile = awsAsyncFactory<{file: File; signedUrl: string}, unknown, Error>(
  'UPLOADFILE',
  (params) => {
    const file = params.file
    const signedUrl = params.signedUrl

    const options = {
      headers: {
        'Content-Type': file.type,
      },
    }

    return axios
      .put(signedUrl, file, options)
	}
)
