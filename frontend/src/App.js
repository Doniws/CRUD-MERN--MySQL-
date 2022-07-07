import ProductList from "./components/ProductList";
import {Routes , Route} from "react-router-dom"
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/add" element={<AddProduct/>}></Route>
        <Route path="/edit/:id" element={<EditProduct/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
