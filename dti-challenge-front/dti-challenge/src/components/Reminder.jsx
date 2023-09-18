

function Reminder(props) {

    function deleteReminder(id) {
      fetch("http://localhost:5242/reminders/" + id)        
    }

    return(
        <div>
            <p>Date: {props.date} </p>
            <p>Title: {props.title} </p>
            <button onClick={deleteReminder(props.id)}>
            Delete
            </button>
        </div>
    )
}

export default Reminder;