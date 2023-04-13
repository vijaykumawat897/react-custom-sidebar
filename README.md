## React Custom Sidebar

React Custom Sidebar is a fully customizable sidebar component for React.
- Can be used a docked or over content.
- Docked version has open and close state.
- Fully customizabe light and dark theme option.
- User profile section.
- Dedicated logout button
- Auto adjusted on mobile devices to 'Over content' mode
- Custom styles supported


### Screenshots

desktop view

![screen 1](https://raw.githubusercontent.com/vijaykumawat897/react-custom-sidebar/master/images/screen1.png)

desktop view menu closed

![screen 2](https://raw.githubusercontent.com/vijaykumawat897/react-custom-sidebar/master/images/screen2.png)

mobile view menu opened

![screen 3](https://raw.githubusercontent.com/vijaykumawat897/react-custom-sidebar/master/images/screen3.png)

light theme

![screen 5](https://raw.githubusercontent.com/vijaykumawat897/react-custom-sidebar/master/images/screen5.png)

### Installation

`npm install react-custom-sidebar`


### Getting started

```jsx
import { Sidebar } from "react-custom-sidebar";

const themeColors = {
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

function App() {
  // sidebar toggle status
  const [isMenuOpen, setIsMenuOpened] = useState(false);

  // menu list
  const menuItems = [
    {
      title: "Home",
      link: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      title: "Mails",
      link: "/mails",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
      title: "Services",
      link: "/services",
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      title: "Contacts",
      link: "/contacts",
      icon: <FontAwesomeIcon icon={faContactCard} />,
    },
  ];

  // logout click handler
  const handleLogout = () => {
    console.log("logout clicked");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          menuItems={menuItems}
          theme="light"
          logoUrl="add logo url here"
          themeColors={defaultThemeColors}
          showLogout={true}
          handleLogout={handleLogout}
          userDetails={{
            name: "User name",
            description: "designation", // 
            avatar: "add user avatart url here",
          }}
          closeOnLinkClick={false}
          isSidebarOpened={isMenuOpen}
          handleSidebarToggle={setIsMenuOpened}
          showToggleButton={true}
        >
          // main content here
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="mails" element={<Mails />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="services" element={<Services />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;

```



### Supported props

| Property name      | Type                      | Default              | Description                                                                                                                                                              |
| ------------------ | ------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| docked           | boolean | true for desktop/tablet and false for mobiles                  | If the sidebar is docked with main content or float over it  
| menuItems           | array of objects | Empty array                  | The list of menu items to be rendered                                                                                                                                                         |
| logoUrl      | string                    | NULL                  | Logo url                                                                                                                                  |
| theme   | string                    | dark                  | light/dark                                                                                                                                   |
| themeColors   | object                    | default colors               | Theme colors                                                                                                                                       |
| showLogout   | boolean                    | false                 | To show/hide logout button                                                                                                                                  |
| handleLogout            | function | NULL                  | Logout button click listener                                                                                                                                                       |
| userDetails          | object                  | NULL                  | User details to be shown in sidebar.              |
| closeOnLinkClick             | boolean                   | false                | To close the sidebar on menu item click                                                                                                                                  |
| isSidebarOpened               | boolean                   | true                | If the sidebar should be open                                                                                                                                            |
| showToggleButton        | boolean                   | true                 | If hamburger menu icon visible                                                                                                                                       |
| handleSidebarToggle              | function                   | n/a                 |                                                        Callback called when the sidebar status changed from hamburger menu icon                                                                               |
| showTooltipOnClose   | boolean                    | true                  | If tooltip visible in closed state.                                                                                         |
| styles   | object                    | empty object                  | Custom styles.                                                                                         |


### Default theme colors                                              
```jsx
{
  light: {
    bgColor: "#e4e4e6", // sidebar background color
    textColor: "#0f0f1f", // text color
    highlights: "#cfcfcf", // bg color of active/hover link item
  },
  dark: {
    bgColor: "#0f0f1f",
    textColor: "#ffffff",
    highlights: "#21213d",
  },
}
```

### Menu items                                              
```jsx
[
    {
        title: "Home",
        link: "/home",
        icon: "" //  component or img,
    },
    ...
]
```

### userDetails                                              
```jsx
{
    name: "",
    description: "",
    avatar: ""
}
```

## Styles

Custom styles can be passed as an object with these keys:

```jsx
{
    sidebar : { /* for main container */},
    logo: { /* for logo icon */},
    toggleIcon: { /* for hamburger menu icon */},
    menuItem: { /* for menu logo and text container */},
    menuItemIcon: { /* for menu item logo */},
    menuItemText: { /* for menu item text */},
    userContainer: { /* for  user details container */},
    username: { /* for username text */},
    avatar: { /* for user avatar */},
    userDescription: { /* for user description text */},
    logout: { /* for logout icon */},
}
``` 

