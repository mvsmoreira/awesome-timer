import type { NextPage } from 'next'
import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CyclesContext } from '../contexts/CyclesContext'
import {
  HistoryContainer,
  HistoryHeader,
  HistoryList,
  ResetHistoryButton,
  Status,
} from '../styles/History.styles'
import { Trash } from 'phosphor-react'

const History: NextPage = () => {
  const { cycles, clearHistory } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <HistoryHeader>
        <h1>Meu histórico</h1>
        <ResetHistoryButton
          type="reset"
          disabled={cycles.length === 0}
          onClick={clearHistory}
        >
          <Trash size={24} />
          Limpar histórico
        </ResetHistoryButton>
      </HistoryHeader>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status status="green">Concluído</Status>
                  )}
                  {cycle.abortedDate && (
                    <Status status="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.abortedDate && (
                    <Status status="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

export default History
