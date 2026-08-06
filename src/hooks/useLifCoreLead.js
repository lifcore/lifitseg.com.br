// /hooks/useLifCoreLead.js

import { useState } from 'react'
import { lifcoreApi } from '../services/lifcoreApi.js'

export function useLifCoreLead() {
  const [status, setStatus] = useState('IDLE') // IDLE | SENDING | SUCCESS | ERROR
  const [errorMessage, setErrorMessage] = useState('')
  const [responseData, setResponseData] = useState(null)

  const submit = async (formData) => {
    setStatus('SENDING')
    setErrorMessage('')

    try {
      const result = await lifcoreApi.submitLead(formData)
      setResponseData(result)
      setStatus('SUCCESS')
    } catch (error) {
      setErrorMessage(error.message || 'Ocorreu um erro inesperado.')
      setStatus('ERROR')
    }
  }

  const reset = () => {
    setStatus('IDLE')
    setErrorMessage('')
    setResponseData(null)
  }

  return {
    status,
    errorMessage,
    responseData,
    submit,
    reset,
  }
}
