import React from 'react'

function CreateReminderForm() {
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
        <div>
          <form>
            <label>
                Title:
                <input type="text" title="title" value={state.title} onChange={handleChange} />
            </label>
            <label>
                Date:
                <input type="text" title="date" value={state.date} onChange={handleChange} />
            </label>
        </form>
        <button onClick={handleOnClick}>Create</button>
        </div>
    )
}

export default CreateReminderForm;