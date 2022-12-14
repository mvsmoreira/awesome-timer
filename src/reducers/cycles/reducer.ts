import { ActionTypes } from './actions'
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  abortedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.INIT_STORED:
      return action.payload

    case ActionTypes.CREATE_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.ABORT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, abortedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }

    case ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }

    case ActionTypes.CLEAR_HISTORY:
      return {
        cycles: [],
        activeCycleId: null,
      }

    default:
      return state
  }
}
