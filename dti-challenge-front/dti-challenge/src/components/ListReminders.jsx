import React from 'react'
import Reminder from './Reminder';

function sortRemindersByDate(listOfReminders) {
    return listOfReminders.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
    }).reverse()
}

function ListReminders() {
    const [reminders, setReminders] = React.useState([])

    const fetchReminders = () => {
      fetch("http://localhost:5242/reminders/")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setReminders(data)
        })
    }
  
    React.useEffect(() => {
        fetchReminders()
    }, [])

    let remindersList = []

    remindersList = sortRemindersByDate(reminders)

    let listItems = remindersList.map((item) => {
        return <Reminder title={item.title} id={item.id} date={item.date}/>
    })

    return(
        <div className="remindersList">
            <h3>Your reminders:</h3>
            <div>
                <div>{listItems}</div>
            </div>
            
        </div>
    )
}

export default ListReminders;