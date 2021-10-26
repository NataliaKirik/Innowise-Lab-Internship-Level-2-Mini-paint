import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH } from '../routes/path';
import style from './header.module.scss';
import LogInOutButton from '../logInOutButton/logInOutButton';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../redux/store';

function Header() {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);
    return (
        <div className={style.header}>
            <div className={style.menu}>
                <ul>
                    {isAuth || (
                        <>
                            <li>
                                <NavLink to={PATH.LOGIN} activeClassName={style.active}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={PATH.REGISTER} activeClassName={style.active}>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink to={PATH.GALLERY} activeClassName={style.active}>
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={PATH.PAINT} activeClassName={style.active}>
                            Paint
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={style.logOutBtn}>
                <LogInOutButton />
            </div>
        </div>
    );
}

export default Header;
