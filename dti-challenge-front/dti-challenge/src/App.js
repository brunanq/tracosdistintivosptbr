import logo from './img.png';
import './App.css';
import CreateReminderForm from './components/CreateReminderForm';
import ListReminders from './components/ListReminders';
import React from 'react';

function App() {
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
  }, [reminders])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
      </header>
      <main>
        <section className="createReminder">
          <CreateReminderForm></CreateReminderForm>
        </section>
        <section className="listReminder">
          <ListReminders value={reminders}></ListReminders>
        </section>  
      </main>
    </div>
  );
}

export default App;
