const NotificationMessage = ({msg, type}) =>{
    return(
        <div className={type}>
            {msg}
        </div>
    )
}

export default NotificationMessage