import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewTodoForm from '../NewTodoForm'

describe('NewTodoForm', () => {
  it('renders without crashing', () => {
    render(<NewTodoForm addTodo={() => {}} />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm addTodo={() => {}} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('creates a todo with the entered text', async () => {
    const user = userEvent.setup()
    const addTodo = vi.fn()
    render(<NewTodoForm addTodo={addTodo} />)

    await user.type(screen.getByLabelText(/New Todo/i), 'Learn React Testing')
    await user.click(screen.getByRole('button', { name: /Add Todo/i }))
    expect(addTodo).toHaveBeenCalledWith('Learn React Testing')
    expect(screen.getByLabelText(/New Todo/i)).toHaveValue('')
  })
})
