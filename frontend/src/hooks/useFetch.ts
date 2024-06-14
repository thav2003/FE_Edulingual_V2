/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import { useAppStore } from '~/stores'

const useFetchData = (fetchFunction: () => Promise<any>, ...args: any) => {
  const reFetch = useAppStore((state) => state.isRefecth)
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const memoizedFetchFunction = useCallback(fetchFunction, [...args])

  useEffect(() => {
    setLoading(true)
    memoizedFetchFunction()
      .then((res: any) => {
        setLoading(false)
        if (res) {
          setResponse(res)
        } else {
          setError('Sorry! Something went wrong. App server error')
        }
      })
      .catch((err) => {
        setError(err.message || 'Sorry! Something went wrong. App server error')
        setLoading(false)
      })
  }, [memoizedFetchFunction, reFetch])

  return [loading, error, response]
}

export default useFetchData
