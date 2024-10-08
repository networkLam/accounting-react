const BASE_URL = 'http://localhost:3000/'

const Icon = ({ type, className, onClick }) => {
  return (
    <img
      onClick={onClick}
      className={className}
      src={`${BASE_URL + type}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }}
    />
  )
}

export default Icon
