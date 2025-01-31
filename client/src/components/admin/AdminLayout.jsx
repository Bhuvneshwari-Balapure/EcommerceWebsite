import { Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import AdminHeader from "./AdminHeader";

import AdminFooter from "./AdminFooter";

const AdminLayout = () => (
  <div className="admin-home">
    <AdminHeader />
    <Container fluid>
      <table className="w-100 mt-4">
        <tbody>
          <tr>
            <td className="left-navbar p-4">
              <ul className="menu-list">
                <li>
                  <Link to="/adminLayout">Admin Home</Link>
                </li>
                <li>
                  <Link to="/adminLayout/createProducts">Create Products</Link>
                </li>
                <li>
                  <Link to="/adminLayout/displayProducts">
                    Display Products
                  </Link>
                </li>
                <li>
                  <Link to="/adminLayout/editProducts">Edit Products</Link>
                </li>
              </ul>
            </td>
            <td className="outlet-section p-4">
              <Outlet />
            </td>
          </tr>
        </tbody>
      </table>
      <AdminFooter />
    </Container>
  </div>
);

export default AdminLayout;
