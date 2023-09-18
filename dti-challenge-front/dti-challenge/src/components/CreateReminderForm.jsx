import React from 'react'

function CreateReminderForm(props) {
    const [state, setState] = React.useState({
        title: "",
        date: ""
    })
    
    function handleChange(event) {
        const value = event.target.value;
        setState({
        ...state,
        [event.target.title]: value
        });

        props.value();
    }

    function handleOnClick() {
        fetch("http://localhost:5242/reminders/", {
            method: 'POST', 
            mode: 'cors',
            body: JSON.stringify({"title": state.title, "date": state.date}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then((response) => response.json())
        .then((data) => {
            if(data?.message) {
                alert("ERROR: " + data.message)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    return(
        <div className="reminderForm">
          <form>
            
            <label>
                <h1>Title </h1>
            </label>
            <input type="text" title="title" value={state.title} onChange={handleChange} />
          
            <label>
                <h1>Date </h1>  
            </label>
             <input type="text" title="date" value={state.date} onChange={handleChange} />
        </form>
        <button className="reminderBtn" onClick={handleOnClick}>Create</button>
        <hr></hr>
        </div>
    )
}

export default CreateReminderForm;