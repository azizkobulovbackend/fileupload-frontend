import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: 20, background: "#eee" }}>
    <Link to="/" style={{ marginRight: 10 }}>Upload</Link>
    <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
