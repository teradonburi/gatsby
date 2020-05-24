import { AxiosInstance } from 'axios'
import actionCreatorFactory from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'

const getSignedUrlAction = asyncFactory(actionCreatorFactory('AWS/SIGNEDURL'))

export const getSignedUrl = getSignedUrlAction<{file: File}, {signedUrl?: string}, Error>(
  'getSignedUrl',
  (params, dispatch, getState, client: AxiosInstance) => {
    const file = params.file

    return client
      .get('/api/signedUrl', {params: {fileName: file.name, type: file.type}})
      .then(res => res.data)
      .then(signedUrl => {
        return signedUrl
      })
      .catch(error => {
        console.error(error)
      })
	}
)
