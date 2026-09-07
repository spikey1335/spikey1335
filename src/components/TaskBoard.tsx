import { useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Filter, Task } from '../types'

const FILTERS: Filter[] = ['all', 'active', 'done']

function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  }
}

const SEED_TASKS: Task[] = [
  createTask('Scaffold the Vite + React + TypeScript app'),
  createTask('Wire up the Cloud Agent environment'),
]

export function TaskBoard() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('spikey1335.tasks', SEED_TASKS)
  const [filter, setFilter] = useState<Filter>('all')
  const [draft, setDraft] = useState('')

  const remaining = useMemo(() => tasks.filter((t) => !t.done).length, [tasks])

  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.done)
    if (filter === 'done') return tasks.filter((t) => t.done)
    return tasks
  }, [tasks, filter])

  function addTask() {
    const title = draft.trim()
    if (!title) return
    setTasks((prev) => [createTask(title), ...prev])
    setDraft('')
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function clearDone() {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  return (
    <section className="board" aria-label="Task board">
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault()
          addTask()
        }}
      >
        <input
          className="composer__input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a task and press Enter…"
          aria-label="New task title"
          data-testid="new-task-input"
        />
        <button className="composer__add" type="submit" data-testid="add-task">
          Add
        </button>
      </form>

      <div className="toolbar">
        <span className="toolbar__count" data-testid="remaining-count">
          {remaining} {remaining === 1 ? 'task' : 'tasks'} left
        </span>
        <div className="toolbar__filters" role="tablist" aria-label="Filter tasks">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={filter === option}
              className={`chip ${filter === option ? 'chip--active' : ''}`}
              onClick={() => setFilter(option)}
              data-testid={`filter-${option}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <ul className="tasks" data-testid="task-list">
        {visible.length === 0 && (
          <li className="tasks__empty">Nothing here yet — add your first task above.</li>
        )}
        {visible.map((task) => (
          <li key={task.id} className={`task ${task.done ? 'task--done' : ''}`}>
            <label className="task__main">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark "${task.title}" as ${task.done ? 'active' : 'done'}`}
              />
              <span className="task__title">{task.title}</span>
            </label>
            <button
              type="button"
              className="task__delete"
              onClick={() => removeTask(task.id)}
              aria-label={`Delete "${task.title}"`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <footer className="board__footer">
        <button type="button" className="link" onClick={clearDone} data-testid="clear-done">
          Clear completed
        </button>
      </footer>
    </section>
  )
}
