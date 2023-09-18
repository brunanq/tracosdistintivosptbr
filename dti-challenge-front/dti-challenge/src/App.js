import logo from './logo.svg';
import './App.css';
import CreateReminderForm from './components/CreateReminderForm';
import ListReminders from './components/ListReminders';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateReminderForm></CreateReminderForm>
        <ListReminders></ListReminders>
      </header>
    </div>
  );
}

export default App;
