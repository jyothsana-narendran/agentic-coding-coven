import { useContext } from 'react'
import { WorkflowContext } from './WorkflowContextDefinition'

export function useWorkflow() {
  const context = useContext(WorkflowContext)
  if (!context) throw new Error('useWorkflow must be used within WorkflowProvider')
  return context
}
