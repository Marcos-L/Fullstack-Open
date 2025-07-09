const StatusMessage = ({ status }) => {
    if (status){
        return(
            <div className={`status ${status.type}`}>
                {status.message}
            </div>
        )
    }
    else{
        return null
    }
}

export default StatusMessage