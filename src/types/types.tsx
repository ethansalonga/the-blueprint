import { User } from "firebase/auth"
import { FieldValue, Timestamp } from "firebase/firestore"

export type Role = {
  id?: string
  title: string
  description: string
  rank: number
  userRef: string
}

export type Goal = {
  id?: string
  goal: string
  rank: number
  userRef: string
}

export type Milestone = {
  id?: string
  category: string
  paths: {
    name: string
    goals: {
      goal: string
      isComplete: boolean
      createdAt: Timestamp
      completedAt?: Timestamp
    }[]
  }[]
  userRef: string
}

export type NewMilestone = {
  category: string
  pathName: string
  goalName: string
  userRef: string
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
