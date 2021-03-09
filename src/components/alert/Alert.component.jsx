const Alert = ({title,alertDisable})=>{
    return(
        <div className="app__alert">
            <h2>The cat named <span>{title}</span> has already been added</h2>
            <button
                className="app__alert-button"
                onClick={alertDisable}
            >
                OK
            </button>
        </div>
    )
}
export default Alert;