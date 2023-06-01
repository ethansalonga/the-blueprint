import { User } from "firebase/auth"
import { FieldValue } from "firebase/firestore"

export type Role = {
  id?: string
  title: string
  description: string
  rank: number
  userRef: string
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

export type AuthFormDataCopy = {
  email: string
  password?: string
  timestamp?: FieldValue
}

export type AuthUpdateData = {
  user: User
  email: string
  password: string
}
