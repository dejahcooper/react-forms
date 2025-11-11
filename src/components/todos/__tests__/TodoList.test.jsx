import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../TodoList'

describe('TodoList', () => {
  it('renders without crashing', () => {
    render(<TodoList />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<TodoList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('allows users to add, edit, and remove todos', async () => {
    const user = userEvent.setup()
    render(<TodoList />)

    await user.type(screen.getByLabelText(/New Todo/i), 'Write tests')
    await user.click(screen.getByRole('button', { name: /Add Todo/i }))
    const todoItem = screen.getByTestId(/todo-item-/)
    expect(within(todoItem).getByText('Write tests')).toBeInTheDocument()

    await user.click(within(todoItem).getByRole('button', { name: /Edit/i }))
    const editInput = within(todoItem).getByLabelText(/Edit todo/i)
    await user.clear(editInput)
    await user.type(editInput, 'Ship project')
    await user.click(within(todoItem).getByRole('button', { name: /Save/i }))
    expect(within(todoItem).getByText('Ship project')).toBeInTheDocument()

    const removeButton = within(todoItem).getByRole('button', { name: /Remove todo/i })
    await user.click(removeButton)
    expect(screen.queryByTestId(/todo-item-/)).not.toBeInTheDocument()
  })
})
