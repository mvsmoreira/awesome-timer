import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  abortCycleAction,
  ActionTypes,
  clearHistoryAction,
  createNewCycleAction,
  setActiveActionAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer, CyclesState } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setActiveCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  abortCycle: () => void
  clearHistory: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

const initialState = {
  cycles: [],
  activeCycleId: null,
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, initialState)
  const { cycles, activeCycleId } = cyclesState as CyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const storedAsJSON = JSON.parse(
      localStorage.getItem('@awesome-timer:cycles-state-1.0.0')!,
    )
    if (storedAsJSON) {
      dispatch({
        type: ActionTypes.INIT_STORED,
        payload: storedAsJSON,
      })
    }
  }, [])

  useEffect(() => {
    if (cyclesState !== initialState) {
      localStorage.setItem(
        '@awesome-timer:cycles-state-1.0.0',
        JSON.stringify(cyclesState),
      )
    }
  }, [cyclesState])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const setActiveCycleAsFinished = () => {
    dispatch(setActiveActionAsFinishedAction())
  }

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const abortCycle = () => {
    dispatch(abortCycleAction())
  }

  const clearHistory = () => {
    dispatch(clearHistoryAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        setActiveCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        abortCycle,
        clearHistory,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
