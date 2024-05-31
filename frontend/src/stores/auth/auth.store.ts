import { BASE_PATH } from './../../../generated-api-client/base'
import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthenticationApi } from '~/api'

import { AuthStatus, RegisterUser, User } from '~/interfaces'

const authApi = new AuthenticationApi()

export interface AuthState {
  status: AuthStatus
  token?: string
  user?: User

  loginUser: (email: string, password: string) => Promise<void>
  logoutUser: () => void
  registerUser: (data: RegisterUser) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    // try {
    // const res = await authApi.apiV1LoginPut({ username: email, password: password })
    // const data = res.data.data!
    // set({
    //   status: 'authorized',
    //   token: data.accessToken!,
    //   user: {
    //     _id: data.id!,
    //     name: data.name!,
    //     email: data.username!
    //   }
    // })
    if (email === 'student') {
      set({
        status: 'authorized',
        token: 'accessToken',
        user: {
          _id: 'id',
          name: 'Name 1',
          email: 'Email 1',
          role: 'STUDENT'
        }
      })
    }
    if (email === 'teacher') {
      set({
        status: 'authorized',
        token: 'accessToken',
        user: {
          _id: 'id',
          name: 'Name 1',
          email: 'Email 1',
          role: 'TEACHER'
        }
      })
    }
    if (email === 'admin') {
      set({
        status: 'authorized',
        token: 'accessToken',
        user: {
          _id: 'id',
          name: 'Name 1',
          email: 'Email 1',
          role: 'ADMIN'
        }
      })
    }
    // } catch (error) {
    //   set({ status: 'unauthorized', token: undefined, user: undefined })
    //   console.log('Credenciales incorrectas')
    // }
  },
  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerUser: async (data: RegisterUser) => {
    try {
      // await AuthService.registerUser(data)
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
})

export const useAuthStore = create<AuthState>()(devtools(persist(storeApi, { name: 'auth-storage' })))
