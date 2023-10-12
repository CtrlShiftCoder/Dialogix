import React, { useEffect, useState } from 'react'
import { checkApiKey } from '../utils/checkKeys'

const Setting = ({ modalOpen, setModalOpen }) => {
  const apiKey = window.localStorage.getItem('api-key') || ''
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [input, setInput] = useState('')

  const saveKey = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const keys = input

    await checkApiKey(keys)
      .then(() => {
        window.localStorage.setItem('api-key', keys)
        console.log('funcionó')
        setModalOpen(false)
      })
      .catch(() => {
        console.log('No funciona')
        setErrorMsg('error: Debe agregar una clave de API OPENAI')
      })

    setLoading(false)
  }

  const removeApiKey = () => {
    window.localStorage.removeItem('api-key')
    setInput('')
  }

  useEffect(() => {
    if (modalOpen) {
      setInput(apiKey)
    }
  }, [apiKey, modalOpen])

  return (
    <form onSubmit={saveKey} className='flex flex-col items-center justify-center gap-2'>
      <p className='text-lg font-semibold'>Usa tu API-key de OPENAI.</p>
      <p>Las claves se guardan en su propio navegador.r</p>
      <p className='italic'>
        Obtenga la clave API de OpenAI{' '}
        <a
          className='text-blue-600'
          rel='noreferrer'
          target='_blank'
          href='https://platform.openai.com/account/api-keys'
        >
          Aquí
        </a>
        .
      </p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='password'
        className='w-full max-w-xs input input-bordered'
      />
      <button disabled={loading} className='w-full max-w-xs btn btn-outline'>
        {loading ? <span className='w-56 progress progress-info' /> : 'Guardar Clave'}
      </button>
      {apiKey && input && (
        <span onClick={removeApiKey} disabled={loading} className='w-full max-w-xs btn btn-error'>
          remove keys
        </span>
      )}
      <p>{errorMsg}</p>
    </form>
  )
}

export default Setting
