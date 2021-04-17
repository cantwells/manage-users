import { useDispatch } from "react-redux";
import "./App.css";
import { fetchUsers } from "./redux/slices/usersSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchUsers());
  return <div>Test</div>;
}

export default App;
