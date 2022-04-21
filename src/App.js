import "./App.css";
import { Header } from "./components";
import { HomeRoute } from "./routes";
function App() {
  return (
    <div className="App">
      <Header />
      <HomeRoute />
    </div>
  );
}

export default App;
