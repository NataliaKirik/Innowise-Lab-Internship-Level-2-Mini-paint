import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../constants/routes';
import s from './header.module.scss';
import LogInOutButton from '../logInOutButton/logInOutButton';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';

function Header() {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);
    return (
        <div className={s.header}>
            <div className={s.menu}>
                <ul>
                    {isAuth || (
                        <>
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
                        </>
                    )}
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
            <div className={s.logOutBtn}>
                <LogInOutButton />
            </div>
        </div>
    );
}

export default Header;
