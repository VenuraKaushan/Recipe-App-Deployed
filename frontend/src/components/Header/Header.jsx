// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../app/theme/theme.Slice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      await axios.post("http://localhost:3001/api/auth/logout");
      navigate("/");
      window.location.reload();
    } catch (error) {
      //error alert
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          COOK
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                Name : {currentUser.firstname}
              </span>
              <span className="block text-sm font-medium truncate">
                Email : {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/home">Home </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/recipes">Recipes</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/favouriterecipes">Favorite</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
