export type StatusType = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'

export interface TaskEditInput {
  description?: string
  status?: StatusType
  title?: string
}
