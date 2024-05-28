import { FC, useState } from 'react'
import style from './Header.module.scss';
import { Dropdown } from '../Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header: FC = () => {

  const {user} = useSelector(state => state)

  return (
    <nav className={style.navbar}>
      <div className={style.leftSection}>
        <span className={style.appName}><Link className={style.link} to={'/'}>DREAM</Link></span>
      </div>
      <div className={style.rightSection}>
        <ul>
          {user.isAuth && <li> 
            <Dropdown />
          </li>}
          {!user.isAuth && <li>
            <Link to={'/login'}>
              <button className={style.loginButton}>Войти</button>
            </Link>
          </li>}
        </ul>
      </div>
    </nav>
  );
}