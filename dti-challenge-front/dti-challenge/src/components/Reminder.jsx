function Reminder(props) {

    function deleteReminder(id) {
      fetch("http://localhost:5242/reminders/" + id)        
    }

    return(
        <div>
            <p>Title {props.title} </p>
         
            <p>Date{props.date} </p>
            <br />
            <button onClick={deleteReminder(props.id)}>Delete</button>
        </div>
    )
}

export default Reminder;