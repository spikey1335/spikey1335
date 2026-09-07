export type Filter = 'all' | 'active' | 'done'

export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: number
}
