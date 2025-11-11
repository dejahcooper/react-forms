import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Box from '../Box'

describe('Box', () => {
  const props = {
    id: 'box-1',
    width: 120,
    height: 80,
    backgroundColor: '#123456',
    onRemove: vi.fn(),
  }

  it('renders without crashing', () => {
    render(<Box {...props} />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Box {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('calls onRemove when the X button is clicked', async () => {
    const user = userEvent.setup()
    render(<Box {...props} />)
    await user.click(screen.getByRole('button', { name: /Remove box/i }))
    expect(props.onRemove).toHaveBeenCalledWith('box-1')
  })
})
