import './App.css';
import { UseState } from './components/UseState';
import { ClassState } from './components/ClassState';
import { UseReducer } from './components/UseReducer';

function App() {
  return (
    <div className="app">
      <h1>State Management with React</h1>
      <UseState />
      <ClassState />
      <UseReducer />
    </div>
  );
}

export default App;
