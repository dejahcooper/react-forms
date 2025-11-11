const Box = ({ id, width, height, backgroundColor, onRemove }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor,
  }

  return (
    <div className="box-item" data-testid={`box-${id}`}>
      <div
        className="box-visual"
        style={style}
        data-color={backgroundColor}
        aria-label={`${width}px by ${height}px ${backgroundColor} box`}
      />
      <button
        type="button"
        className="danger"
        onClick={() => onRemove(id)}
        aria-label="Remove box"
      >
        X
      </button>
    </div>
  )
}

export default Box
