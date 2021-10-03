import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import s from './header.module.css';

function Header() {
    return (
        <div className={`${s.headerWrapper}`}>
            <div className={s.componentRoutesWrapper}>
                <div className={`${s.text}`}>Mini paint</div>
            </div>
            <ul className={`${s.main_Menu}`}>
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
    );
}

export default Header;
