import './ProgressToggle.css'

const ProgressToggle = ({ done, handleToggle }) => {
    return (
      <div onClick={handleToggle} className={`progress-bubble ${done? 'done':null}`}></div>
    )
  };

  export default ProgressToggle;