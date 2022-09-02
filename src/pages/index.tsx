import type { NextPage } from 'next'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  AmountInput,
  CountdownButton,
  CountdownContainer,
  Divider,
  FormContainer,
  HomeContainer,
  TaskInput,
} from '../styles/Home.styles'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number().min(5).max(60),
})

type NewCycleFormData = z.infer<typeof newCycleFormSchema>

const Home: NextPage = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleCreateNewCycle = (data: any) => {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <AmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Divider>:</Divider>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}

export default Home
