import { User } from "firebase/auth"

export type Role = {
  id?: number
  title: string
  description: string
}

export type Goal = {
  id?: number
  goal: string
}

export type MilestoneSection = {
  category: string
  goals: {
    id?: number
    goal: string
    status: string
  }[]
}

export type AuthFormData = {
  email: string
  password: string
}

export type AuthUpdateData = {
  user: User
  email: string
  password: string
}
