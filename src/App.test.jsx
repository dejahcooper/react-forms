import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('shows both app sections', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Color Box Maker/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Todo List/i })).toBeInTheDocument()
  })
})
