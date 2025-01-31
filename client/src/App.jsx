import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/website/Layout";
import Banner1 from "./pages/website/Banner1";
import Makeup from "./pages/website/FourthDiv.jsx/Mekeup";
import SkinCare from "./pages/website/FourthDiv.jsx/SkinCare";
import HairCare from "./pages/website/FourthDiv.jsx/HairCare";
import BathBody from "./pages/website/FourthDiv.jsx/BathBody";
import Fragrance from "./pages/website/FourthDiv.jsx/Fragrance";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/adminLayout";
import AdminHome from "./pages/admin/AdminHome";
import CreateProduct from "./pages/admin/CreateProduct";
import DisplayProduct from "./pages/admin/DisplayProduct";
import EditProduct from "./pages/admin/EditProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* website Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Banner1 />} />

          <Route path="fashion/makeup" element={<Makeup />} />
          <Route path="fashion/skincare" element={<SkinCare />} />
          <Route path="fashion/haircare" element={<HairCare />} />
          <Route path="fashion/bath&body" element={<BathBody />} />
          <Route path="fashion/fragrance" element={<Fragrance />} />
          <Route path="porduct" element={<DisplayProduct />} />
        </Route>

        {/* Admin Route */}
        <Route path="/admin" element={<AdminLogin />}></Route>

        <Route path="/adminLayout" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="createProducts" element={<CreateProduct />} />
          <Route path="displayProducts" element={<DisplayProduct />} />
          <Route path="editProducts" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
