import { useId, useState } from 'react'

const initialState = {
  task: '',
}

const NewTodoForm = ({ addTodo }) => {
  const [formData, setFormData] = useState(initialState)
  const inputId = useId()

  const handleChange = (event) => {
    setFormData({ task: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const task = formData.task.trim()
    if (!task) return

    addTodo(task)
    setFormData(initialState)
  }

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="form-control full-width">
        <label htmlFor={inputId}>New Todo</label>
        <input
          id={inputId}
          name="task"
          type="text"
          value={formData.task}
          onChange={handleChange}
          placeholder="Walk the dog"
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default NewTodoForm
