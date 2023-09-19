import React from 'react'
import Reminder from './Reminder';

function sortRemindersByDate(listOfReminders) {
    return listOfReminders.sort(function(a,b) {
        return new Date(b.date) - new Date(a.date);
    }).reverse()
}

function ListReminders(props) {
    let remindersList = []

    remindersList = sortRemindersByDate(props.value)

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