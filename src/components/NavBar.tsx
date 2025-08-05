const NavBar = () => {
  return (
    <header className="navbar">
      <img
        src="https://www.komunitasmea.web.id/wp-content/uploads/2021/11/cropped-logo-rebrand-MEA-digital-marketing-o-3.png"
        alt="MEA Logo"
        className="logo"
      />
      <div className="userInfo">
        <img src="https://i.pravatar.cc/40" alt="User" className="avatar" />
        <span>Halo, Shotaro Osaki</span>
      </div>
    </header>
  );
};

export default NavBar;
