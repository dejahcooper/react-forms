import { useEffect, useId, useState } from 'react'

const Todo = ({ id, task, onRemove, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task)
  const inputId = useId()

  useEffect(() => {
    setDraft(task)
  }, [task])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) return

    onSave(id, trimmed)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setDraft(task)
  }

  return (
    <li className="todo-item" data-testid={`todo-item-${id}`}>
      {isEditing ? (
        <form className="todo-edit" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor={inputId}>
            Edit todo
          </label>
          <input
            id={inputId}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <div className="todo-actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p data-testid="todo-task">{task}</p>
          <div className="todo-actions">
            <button type="button" className="secondary" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => onRemove(id)}
              aria-label="Remove todo"
            >
              X
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default Todo
