
import { ChangeEvent, FormEvent, useState } from 'react'

import { Header } from './components/Header'
import { TaskCard } from './components/TaskCard'

import { TaskEmpty } from './components/TaskEmpty'
import { PlusCircle } from 'phosphor-react'

import styles from './App.module.css'
import './global.css'

interface Tasks {
  content: string;
  done: boolean;
}

export function App() {

  const [tasks, setTasks] = useState<Tasks[]>([])
  const [createdTasks, setCreatedTasks] = useState(0)
  const [checkedTask, setCheckedTask] = useState(0)
  const [newTaskText, setNewTaskText] = useState('')

  const isNewTaskInputEmpty = newTaskText.length === 0

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")
    setNewTaskText(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      content: newTaskText,
      done: false
    }

    setTasks([newTask, ...tasks])
    setNewTaskText("")
    setCreatedTasks(createdTasks + 1)
  }

  function deleteTask(taskContentToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {

      if (task.content === taskContentToDelete && task.done === true) {
        setCheckedTask(checkedTask - 1)
      }

      return task.content !== taskContentToDelete
    })

    setTasks(tasksWithoutDeleteOne)
    setCreatedTasks(createdTasks - 1)
  }

  function doneTask(taskToComplete: string) {
    const taskCompletedOne = tasks.map(task => {

      if (task.content === taskToComplete) {
        task.done = !task.done
        setCheckedTask(checkedTask + 1)

        if (!task.done) {
          setCheckedTask(checkedTask - 1)
        }
      }

      return task
    })

    setTasks(taskCompletedOne)
    console.log(taskCompletedOne);
  }


  return (
    <div className="App">
      <Header />
      <div className={styles.warapper}>

        <form onSubmit={handleCreateTask} className={styles.inputTask}>
          <input
            type="text"
            onChange={handleNewTaskChange}
            value={newTaskText}
            placeholder="Adicione uma nova tarefa"
          />

          <button disabled={isNewTaskInputEmpty} >
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.taskBox}>
          <header>
            <strong>Tarefas criadas <span>{createdTasks}</span></strong>

            <strong>Concluídas <span>{checkedTask === 0 ? '0' : `${checkedTask} de ${createdTasks}`}</span></strong>
          </header>

          <div className={styles.tasklist}>

            {tasks.length ? (
              tasks.map(task => {
                return (
                  <TaskCard
                    content={task.content}
                    done={task.done}
                    key={task.content}
                    onCheckedTask={doneTask}
                    onDeleteTask={deleteTask}
                  />
                )
              })
            ) : (
              <TaskEmpty />
            )
            }

          </div>
        </div>

      </div>
    </div>
  )
}

