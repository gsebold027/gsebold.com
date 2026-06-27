import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { AxiosRequestConfig, isAxiosError } from 'axios'

import { useAxios } from './axios.facade'

export type MutationOptions<T, U> = Omit<UseMutationOptions<U, Error, T>, 'mutationFn'> & {
  invalidateQueryKey?: QueryKey
}

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>

const handleRetry = (failureCount: number, error: Error) => {
  if (!isAxiosError(error)) return false

  if (
    (error.response && failureCount === 3) ||
    (error.response &&
      error.response.status >= 400 &&
      error.response.status < 500 &&
      failureCount > 0)
  ) {
    return false
  }

  return failureCount < 3
}

const useGet = <T>(
  keys: QueryKey,
  useQueryOptions?: QueryOptions<T>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()

  return useQuery<T>({
    queryKey: keys,
    queryFn: async ({ queryKey }) => {
      try {
        const res = await axios.get<T>(queryKey[0] as string, axiosOptions)

        return res?.data
      } catch (error) {
        console.log('Request Error:', error)
        throw error
      }
    },
    retry: handleRetry,
    ...useQueryOptions
  })
}

const useGetWithId = <T>(
  keys: QueryKey,
  useQueryOptions?: QueryOptions<T>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()

  return useQuery<T>({
    queryKey: keys,
    queryFn: async ({ queryKey }) => {
      const res = await axios.get<T>(
        `${queryKey[0] as string}${queryKey[1] as string}`,
        axiosOptions
      )

      return res.data
    },
    retry: handleRetry,
    ...useQueryOptions
  })
}

const usePost = <T, U>(
  url: string,
  useMutationOptions?: MutationOptions<T, U>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()
  const queryClient = useQueryClient()
  const { invalidateQueryKey, onSuccess, ...restOptions } = useMutationOptions ?? {}

  return useMutation<U, Error, T>({
    mutationFn: async (data: T) => {
      const res = await axios.post<U>(url, data, axiosOptions)

      return res.data
    },
    onSuccess: (data, variables, context, mutation) => {
      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
      onSuccess?.(data, variables, context, mutation)
    },
    retry: handleRetry,
    ...restOptions
  })
}

const usePut = <
  T extends {
    id: string
  },
  U
>(
  url: string,
  useMutationOptions?: MutationOptions<T, U>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()
  const queryClient = useQueryClient()
  const { invalidateQueryKey, onSuccess, ...restOptions } = useMutationOptions ?? {}

  return useMutation<U, Error, T>({
    mutationFn: async (data: T) => {
      const { id, ...dataWithoutId } = data

      const res = await axios.put<U>(`${url}${id}`, dataWithoutId, axiosOptions)

      return res.data
    },
    onSuccess: (data, variables, context, mutation) => {
      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
      onSuccess?.(data, variables, context, mutation)
    },
    retry: handleRetry,
    ...restOptions
  })
}

const usePatch = <
  T extends {
    id: string
  },
  U
>(
  url: string,
  useMutationOptions?: MutationOptions<T, U>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()
  const queryClient = useQueryClient()
  const { invalidateQueryKey, onSuccess, ...restOptions } = useMutationOptions ?? {}

  return useMutation<U, Error, T>({
    mutationFn: async (data: T) => {
      const { id, ...dataWithoutId } = data

      const res = await axios.patch<U>(`${url}${id}`, dataWithoutId, axiosOptions)

      return res.data
    },
    onSuccess: (data, variables, context, mutation) => {
      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
      onSuccess?.(data, variables, context, mutation)
    },
    retry: handleRetry,
    ...restOptions
  })
}

const useDelete = <
  T extends {
    id: string
  },
  U
>(
  url: string,
  useMutationOptions?: MutationOptions<T, U>,
  axiosOptions?: AxiosRequestConfig
) => {
  const axios = useAxios()
  const queryClient = useQueryClient()
  const { invalidateQueryKey, onSuccess, ...restOptions } = useMutationOptions ?? {}

  return useMutation<U, Error, T>({
    mutationFn: async (data: T) => {
      const { id } = data

      const res = await axios.delete<U>(`${url}${id}`, axiosOptions)

      return res.data
    },
    onSuccess: (data, variables, context, mutation) => {
      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
      onSuccess?.(data, variables, context, mutation)
    },
    retry: handleRetry,
    ...restOptions
  })
}

export { useGet, useGetWithId, usePost, usePut, usePatch, useDelete, handleRetry }
