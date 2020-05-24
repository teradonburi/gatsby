import axios, { AxiosInstance } from 'axios'
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const getSignedUrlAction = asyncFactory(actionCreatorFactory('AWS/SIGNEDURL'))
const uploadFileAction = asyncFactory(actionCreatorFactory('AWS/UPLOADFILE'))

export const getSignedUrl = getSignedUrlAction<{file: File}, {signedUrl: string}, Error>(
  'getSignedUrl',
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

export const uploadFile = uploadFileAction<{file: File; signedUrl: string}, {}, Error>(
  'uploadFile',
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
      .then(res => res.data)
      .catch(error => {
        console.error(error)
      })
	}
)
