import { useId, useState } from 'react'

const initialState = {
  width: '',
  height: '',
  backgroundColor: '#000000',
}

const NewBoxForm = ({ addBox }) => {
  const [formData, setFormData] = useState(initialState)

  const widthId = useId()
  const heightId = useId()
  const colorId = useId()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const width = Number(formData.width)
    const height = Number(formData.height)
    const { backgroundColor } = formData

    if (!Number.isFinite(width) || width <= 0) return
    if (!Number.isFinite(height) || height <= 0) return

    addBox({ width, height, backgroundColor })
    setFormData(initialState)
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor={widthId}>Width (px)</label>
        <input
          id={widthId}
          name="width"
          type="number"
          min="1"
          value={formData.width}
          onChange={handleChange}
          placeholder="e.g. 150"
        />
      </div>
      <div className="form-control">
        <label htmlFor={heightId}>Height (px)</label>
        <input
          id={heightId}
          name="height"
          type="number"
          min="1"
          value={formData.height}
          onChange={handleChange}
          placeholder="e.g. 150"
        />
      </div>
      <div className="form-control">
        <label htmlFor={colorId}>Background Color</label>
        <input
          id={colorId}
          name="backgroundColor"
          type="color"
          value={formData.backgroundColor}
          onChange={handleChange}
          aria-label="Pick a color"
        />
      </div>
      <button type="submit">Add Box</button>
    </form>
  )
}

export default NewBoxForm
