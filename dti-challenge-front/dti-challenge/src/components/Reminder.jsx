function Reminder(props) {
    function deleteReminder(id) {
      console.log("FUI CHAMADO PORRA!")
      fetch("http://localhost:5242/reminders/" + id, {
            method: 'DELETE', 
            mode: 'cors',
      })
     
    }

    return(
        <div>
            <p>Date: {props.date} </p>
            <p>Title: {props.title} </p>
            <button className="deleteBtn" onClick={() => deleteReminder(props.id)}>
            Delete
            </button>
        </div>
    )
}

export default Reminder;