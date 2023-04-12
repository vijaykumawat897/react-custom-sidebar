import { useEffect, useState } from "react";
import "../styles.css";
import { FiMenu } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";

const defaultThemeColors = {
  light: {
    bgColor: "#e4e4e6",
    textColor: "#0f0f1f",
    highlights: "#cfcfcf",
  },
  dark: {
    bgColor: "#0f0f1f",
    textColor: "#ffffff",
    highlights: "#21213d",
  },
};

function Sidebar({
  children,
  menuItems,
  logoUrl,
  theme = "light",
  themeColors = defaultThemeColors,
  showLogout = false,
  handleLogout,
  userDetails = null,
  closeOnLinkClick = false,
  isSidebarOpened = true,
  showToggleButton = true,
  handleSidebarToggle,
  showTooltipOnClose = true,
}) {
  const location = useLocation();
  const themeColor = themeColors[theme];
  const [isMenuOpen, setIsMenuOpen] = useState(isSidebarOpened);
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 600) {
      setIsMobileWidth(true);
    }
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(isSidebarOpened);
  }, [isSidebarOpened]);

  useEffect(() => {
    handleSidebarToggle(isMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  const handleResize = (event) => {
    if (event.target.innerWidth <= 768) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
    if (event.target.innerWidth <= 600) {
      setIsMobileWidth(true);
    } else {
      setIsMobileWidth(false);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const mouseEnter = (e) => {
    e.target.style.background = themeColor.highlights;
  };
  const mouseLeave = (e) => {
    if (!e.target.classList.contains("active")) {
      e.target.style.background = null;
    }
  };

  return (
    <div className="main-container">
      <div
        className={`${isMenuOpen ? "opened" : "closed"} sidebar`}
        style={{ background: themeColor.bgColor }}
      >
        <div className="menu-header">
          <div className="logo-container">
            {logoUrl ? <img className="logo" src={logoUrl} alt="logo" /> : null}
          </div>
          {showToggleButton && !isMobileWidth ? (
            <FiMenu
              className="menu-toggle"
              onClick={() => handleMenuToggle()}
              style={{
                stroke: themeColor.textColor,
                fill: themeColor.textColor,
              }}
            />
          ) : null}
          {isMobileWidth ? (
            <MdClose
              className="menu-toggle"
              onClick={() => handleMenuToggle()}
              style={{
                stroke: themeColor.textColor,
                fill: themeColor.textColor,
              }}
            />
          ) : null}
        </div>
        <div className="menu-container">
          <ul>
            {menuItems &&
              menuItems.map((item, key) => (
                <li key={key}>
                  <Link
                    to={item.link}
                    className={`${
                      location.pathname === item.link ? "active" : ""
                    } `}
                    style={{
                      color: themeColor.textColor,
                      background:
                        location.pathname === item.link
                          ? themeColor.highlights
                          : null,
                    }}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onClick={() =>
                      closeOnLinkClick ? setIsMenuOpen(false) : null
                    }
                  >
                    <div>{item.icon}</div>
                    {isMenuOpen ? <div>{item.title}</div> : null}
                    {!isMenuOpen && !isMobileWidth && showTooltipOnClose ? (
                      <div
                        className="menu-item-tooltip"
                        style={{ background: themeColor.bgColor }}
                      >
                        {item.title}
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
          </ul>

          {userDetails ? (
            <div
              className="user-details"
              style={{
                color: themeColor.textColor,
                background: themeColor.highlights,
              }}
            >
              <div className="details-container">
                <img
                  src={
                    userDetails.avatar ||
                    "https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg"
                  }
                  alt="user-avatar"
                  className="user-avatar"
                  style={{ borderColor: themeColor.textColor }}
                />
                {isMenuOpen && userDetails.name ? (
                  <div className="user-name">
                    <h4>{userDetails.name}</h4>
                    {userDetails.description ? (
                      <p>{userDetails.description}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {isMenuOpen && showLogout ? (
                <BiLogOut className="logout" onClick={handleLogout} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Sidebar;
