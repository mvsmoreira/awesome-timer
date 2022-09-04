import { Cycle } from './reducer'

export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  ABORT_CURRENT_CYCLE = 'ABORT_CURRENT_CYCLE',
  SET_ACTIVE_CYCLE_AS_FINISHED = 'SET_ACTIVE_CYCLE_AS_FINISHED',
}

export const createNewCycleAction = (newCycle: Cycle) => {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export const setActiveActionAsFinishedAction = () => {
  return {
    type: ActionTypes.SET_ACTIVE_CYCLE_AS_FINISHED,
  }
}

export const abortCycleAction = () => {
  return {
    type: ActionTypes.ABORT_CURRENT_CYCLE,
  }
}
