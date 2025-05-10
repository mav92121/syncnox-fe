import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
function App() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <NavBar />
      </div>
    </>
  );
}

export default App;
