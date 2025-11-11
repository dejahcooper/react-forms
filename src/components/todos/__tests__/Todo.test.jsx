import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from '../Todo'

describe('Todo', () => {
  const baseProps = {
    id: 'todo-1',
    task: 'Test task',
    onRemove: vi.fn(),
    onSave: vi.fn(),
  }

  it('renders without crashing', () => {
    render(<Todo {...baseProps} />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Todo {...baseProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('allows editing a todo', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<Todo {...baseProps} onSave={onSave} />)

    await user.click(screen.getByRole('button', { name: /Edit/i }))
    await user.clear(screen.getByLabelText(/Edit todo/i))
    await user.type(screen.getByLabelText(/Edit todo/i), 'Updated task')
    await user.click(screen.getByRole('button', { name: /Save/i }))

    expect(onSave).toHaveBeenCalledWith('todo-1', 'Updated task')
  })
})
