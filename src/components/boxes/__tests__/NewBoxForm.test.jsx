import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBoxForm from '../NewBoxForm'

describe('NewBoxForm', () => {
  it('renders without crashing', () => {
    render(<NewBoxForm addBox={() => {}} />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<NewBoxForm addBox={() => {}} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('submits a new box with the entered values', async () => {
    const user = userEvent.setup()
    const addBox = vi.fn()
    render(<NewBoxForm addBox={addBox} />)

    await user.type(screen.getByLabelText(/Width/), '150')
    await user.type(screen.getByLabelText(/Height/), '200')
    fireEvent.change(screen.getByLabelText(/Background Color/), { target: { value: '#ff0000' } })

    await user.click(screen.getByRole('button', { name: /Add Box/i }))

    expect(addBox).toHaveBeenCalledWith({
      width: 150,
      height: 200,
      backgroundColor: '#ff0000',
    })
    expect(screen.getByLabelText(/Width/)).toHaveValue(null)
    expect(screen.getByLabelText(/Height/)).toHaveValue(null)
  })
})
