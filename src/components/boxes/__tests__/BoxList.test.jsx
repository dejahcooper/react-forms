import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BoxList from '../BoxList'

describe('BoxList', () => {
  it('renders without crashing', () => {
    render(<BoxList />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<BoxList />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('allows users to create and remove boxes', async () => {
    const user = userEvent.setup()
    render(<BoxList />)

    await user.type(screen.getByLabelText(/Width/), '90')
    await user.type(screen.getByLabelText(/Height/), '120')
    fireEvent.change(screen.getByLabelText(/Background Color/), { target: { value: '#00ff00' } })
    await user.click(screen.getByRole('button', { name: /Add Box/i }))

    const box = screen.getByTestId(/box-/)
    expect(box).toBeInTheDocument()
    expect(box.querySelector('.box-visual')).toHaveAttribute('data-color', '#00ff00')

    const removeBtn = within(box).getByRole('button', { name: /Remove box/i })
    await user.click(removeBtn)
    expect(screen.queryByTestId(/box-/)).not.toBeInTheDocument()
  })
})
