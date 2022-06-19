import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import CharacterSearch from "../CharacterSearch/CharacterSeacrh";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsAuthed } from "../../store/slices/authSlice";
import Button from "../../ui/button/Button";

const Navbar: React.FC = () => {
  const { isAuthed } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <CharacterSearch />
      <ul className="navbar__menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navbar__link ${isActive ? "navbar__link--active" : ""}`
          }
        >
          Characters
        </NavLink>
        <NavLink
          to={isAuthed ? 'favourite-list' : 'login'}
          className={({ isActive }) =>
            `navbar__link ${isActive && isAuthed ? "navbar__link--active" : ""}`
          }
        >
          Favourite List
        </NavLink>
        {isAuthed ? (
          <Button
            className="btn--primary btn"
            onClick={() => dispatch(setIsAuthed(false))}
          >
            Log out
          </Button>
        ) : (
          <NavLink
            to="login"
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link--active" : ""}`
            }
          >
            Log in
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
