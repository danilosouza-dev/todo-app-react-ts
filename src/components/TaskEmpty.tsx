
import clipBoard from '../assets/clipboard.svg'

import styles from './TaskEmpty.module.css'

export function TaskEmpty() {
  return (
    <div className={styles.taskEmpty}>
      <img src={clipBoard} alt="icone clipboard" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}