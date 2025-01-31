// AdminHeader.jsx

import { Navbar, Container, Nav } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";

const AdminHeader = () => (
  <Navbar bg="transparent" className="admin-header p-3 shadow-sm">
    <Container>
      <Navbar.Brand className="text-white fs-4">Welcome, Admin</Navbar.Brand>
      <Nav>
        <Nav.Link href="/admin" className="text-white" id="log">
          <FiLogOut size={24} /> Logout
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default AdminHeader;
