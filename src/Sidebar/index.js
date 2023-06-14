import { useEffect, useRef, useState } from "react";
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
  logoSmallUrl,
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
  docked = true,
  styles = {},
}) {
  const location = useLocation();
  const themeColor = themeColors[theme];
  const [isMenuOpen, setIsMenuOpen] = useState(isSidebarOpened);
  const [isFloating, setIsFloating] = useState(!docked);
  const dockedRef = useRef(docked);

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 600) {
      setIsFloating(true);
    }
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMenuOpen(isSidebarOpened);
  }, [isSidebarOpened]);

  useEffect(() => {
    handleSidebarToggle(isMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  useEffect(() => {
    dockedRef.current = docked;
    setIsFloating(!docked);
    if (docked) {
      setIsMenuOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docked]);

  const handleResize = (event) => {
    if (event.target.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
    if (event.target.innerWidth <= 600) {
      setIsFloating(true);
    } else {
      setIsFloating(!dockedRef.current);
      if (dockedRef.current) {
        setIsMenuOpen(event.target.innerWidth > 768);
      }
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
        className={`${isMenuOpen ? "opened" : "closed"} sidebar ${
          isFloating ? "floating" : ""
        } `}
        style={{
          ...styles.sidebar,
          background: styles?.sidebar?.background || themeColor.bgColor,
        }}
      >
        <div className="menu-header">
          <div className="logo-container" style={styles.logoContainer}>
            {!showToggleButton && logoSmallUrl && !isMenuOpen && !isFloating ? (
              <img
                className="logo logo-small"
                style={styles.logo}
                src={logoSmallUrl}
                alt="logo"
              />
            ) : (
              <>
                {logoUrl ? (
                  <img
                    className="logo"
                    style={{ ...styles.logo, ...styles.logoSmall }}
                    src={logoUrl}
                    alt="logo"
                  />
                ) : null}
              </>
            )}
          </div>
          {showToggleButton && !isFloating ? (
            <FiMenu
              className="menu-toggle"
              onClick={() => handleMenuToggle()}
              style={{
                ...styles.toggleIcon,
                stroke: styles?.toggleIcon?.stroke || themeColor.textColor,
                fill: styles?.toggleIcon?.fill || themeColor.textColor,
              }}
            />
          ) : null}
          {isFloating ? (
            <MdClose
              className="menu-toggle"
              onClick={() => handleMenuToggle()}
              style={{
                ...styles.toggleIcon,
                stroke: styles?.toggleIcon?.stroke || themeColor.textColor,
                fill: styles?.toggleIcon?.fill || themeColor.textColor,
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
                      ...styles.menuItem,
                      color: styles?.menuItem?.color || themeColor.textColor,
                      background:
                        location.pathname === item.link
                          ? styles?.menuItem?.background ||
                            themeColor.highlights
                          : null,
                    }}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    onClick={() =>
                      closeOnLinkClick ? setIsMenuOpen(false) : null
                    }
                  >
                    <div style={styles.menuItemIcon}>{item.icon}</div>
                    {isMenuOpen ? (
                      <div style={styles.menuItemText}>{item.title}</div>
                    ) : null}
                    {!isMenuOpen && !isFloating && showTooltipOnClose ? (
                      <div
                        className="menu-item-tooltip"
                        style={{
                          ...styles.menuItemTooltip,
                          background:
                            styles?.menuItemTooltip?.background ||
                            themeColor.bgColor,
                        }}
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
                ...styles.userContainer,
                color: styles?.userContainer?.color || themeColor.textColor,
                background:
                  styles?.userContainer?.background || themeColor.highlights,
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
                  style={{
                    ...styles.avatar,
                    borderColor:
                      styles?.avatar?.borderColor || themeColor.textColor,
                  }}
                />
                {isMenuOpen && userDetails.name ? (
                  <div className="user-name">
                    <h4 style={styles.username}>{userDetails.name}</h4>
                    {userDetails.description ? (
                      <p style={styles.userDescription}>
                        {userDetails.description}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {isMenuOpen && showLogout ? (
                <BiLogOut
                  className="logout"
                  style={styles.logout}
                  onClick={handleLogout}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div
        className="main-content-container"
        style={styles.mainContentContainer}
        onClick={() => {
          isMenuOpen && handleMenuToggle();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
