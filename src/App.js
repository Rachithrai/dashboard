import Sidemenu from "./sidemenu/Sidemenu";
import Content from "./content/Content";
import { Provider } from "react-redux";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Sidemenu>
          <Content />
        </Sidemenu>
      </div>
    </Provider>
  );
}

export default App;
