import { createContext, useContext } from 'react'

import Axios, { AxiosInstance } from 'axios'

import { environment } from '@/environments/environment'

const axios = Axios.create({
  baseURL: environment.urls.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error('You must wrap your component in an AxiosProvider')
    },
    get: () => {
      throw new Error('You must wrap your component in an AxiosProvider')
    }
  })
)

export const useAxios = () => useContext(AxiosContext)

export default axios
