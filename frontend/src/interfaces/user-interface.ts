export interface User {
  id: string
  name: string
  username: string
  role: Role
}

export enum Role {
  ADMIN = 0,
  USER = 1,
  TEACHER = 2
}
