import CopyGenerator from './Components/MainPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CopyGenerator />
      </div>
    </Provider>
  );
};

export default App;
