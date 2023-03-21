import './App.scss';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Todo List
      </header>
      <TodoList/>
    </div>
  );
}

export default App;
