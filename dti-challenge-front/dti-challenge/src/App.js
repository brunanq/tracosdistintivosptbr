import logo from './img.png';
import './App.css';
import CreateReminderForm from './components/CreateReminderForm';
import ListReminders from './components/ListReminders';

function App() {
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
          <ListReminders></ListReminders>
        </section>  
      </main>
    </div>
  );
}

export default App;
