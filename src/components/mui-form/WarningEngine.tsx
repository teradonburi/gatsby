import React from 'react'
import { getIn, FormApi } from 'final-form'
import { FormSpy } from 'react-final-form'

const WarningEngine = ({ warn, form }: {warn: (values: object) => ({_warning: object}); form: FormApi}): JSX.Element => {
  React.useEffect(() => {
    // 全体_warningを登録する
    form.registerField('_warning', () => ({}), {})
  }, [])

  return (
    <FormSpy
      subscription={{ values: true }}
      onChange={({ values }): void => {
        const results = warn(values) || {}
        const fields = form.getRegisteredFields() || []
        for (const key of fields) {
          // warningを消すためにはundefinedにする必要がある
          const warning = getIn(results, key)
          if (form.mutators && form.mutators.setFieldData) {
            form.mutators.setFieldData(key, { warning })
          }
        }
        if (form.mutators.setFieldData) {
          if (results._warning) {
            form.mutators.setFieldData('_warning', {
              _warning: results._warning,
            })
          } else {
            form.mutators.setFieldData('_warning', { _warning: undefined })
          }
        }
      }}
    />
  )
}

export default WarningEngine
