import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import s from './header.module.css';
import LogInOutButton from '../logInOutButton/logInOutButton';

function Header() {
    return (
        <div className={s.header}>
            <div className={s.menuWrapper}>
                <ul className={s.menu}>
                    <li>
                        <NavLink to={PATH.LOGIN} activeClassName={s.active}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.REGISTER} activeClassName={s.active}>
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.GALLERY} activeClassName={s.active}>
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PAINT} activeClassName={s.active}>
                            Paint
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={s.signIn}>
                <LogInOutButton />
            </div>
        </div>
    );
}

export default Header;
