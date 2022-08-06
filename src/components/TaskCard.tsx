import { Trash, Circle, CheckCircle } from 'phosphor-react'
import { useState } from 'react';

import styles from './TaskCard.module.css'

interface TaskCardProps {
  content: string;
  done: boolean;
  onDeleteTask: (taskToDelete: string) => void;
  onCheckedTask: (taskToComplete: string) => void
}

export function TaskCard({ content, done, onDeleteTask, onCheckedTask }: TaskCardProps) {
  const [checked, setChecked] = useState(done)
  const [isHovered, setIsHovered] = useState(false)

  function handleDeleteTask() {
    onDeleteTask(content)
  }

  function handleCompleteTask() {
    onCheckedTask(content)
    setChecked(!checked)
  }


  return (
    <div className={styles.taskCard}>

      <div>

        {!checked ? (
          <button 
            className={styles.circleIcon}
            onClick={handleCompleteTask}
          >
            <Circle
              size={24}
              color="#4EA8DE"
            />
          </button>

        ) : (
          <button 
            className={styles.checkCircle}
            onClick={handleCompleteTask}
          >
            <CheckCircle
              size={24}
              color="#8284FA"
              weight="fill"
            />
          </button>
        )
        }

        <p className={checked ? styles.checked : ''} >{content}</p>
      </div>

      <button 
        className={styles.trashIcon} 
        onClick={handleDeleteTask}
        >
        <Trash
          size={20}
          color='#808080'
          weight='regular'
          // onClick={handleDeleteTask}
        />
      </button>

    </div>
  )
}