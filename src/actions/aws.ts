import axios, { AxiosInstance } from 'axios'
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const awsFactory = actionCreatorFactory('AWS')
const awsAsyncFactory = asyncFactory(awsFactory)

export const getSignedUrl = awsAsyncFactory<{file: File}, {signedUrl: string}, Error>(
  'GETSIGNEDURL',
  (params, dispatch, getState, client: AxiosInstance) => {
    const file = params.file

    return client
      .get('/api/signedUrl', {params: {fileName: file.name, fileType: file.type}})
      .then(res => res.data)
      .catch(error => {
        console.error(error)
      })
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
      .catch(error => {
        console.error(error)
      })
	}
)
