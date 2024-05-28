import { FC, useState } from "react";
import style from './Dropdown.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/user.slice";
import $api from "../../http/axios.api";
import { Link } from "react-router-dom";

export const Dropdown: FC = () => {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleClickLogoutBtn = async () => {
        try {
            const response = await $api.post('/logout', {email: user.user.email, password: user.user.password})
            console.log(response)
            localStorage.removeItem('token')
            dispatch(logoutUser())
        } catch (e){
            console.log(e)
        }
    } 

    const [isOpen, setOpen] = useState(false);
    const toggleDropdown = () => {
    setOpen(!isOpen);
  };

    return (
        <div className={style.dropdown}>
            <button className={style.dropdownButton} onClick={toggleDropdown}>{user.user.userName[0]}</button>
            {isOpen && <div className={`${style.dropdownMenu} ${isOpen ? style.active : style.hidden}`}>
                <ul className={style.dropdownList}>
                    <li className={style.dropdownItem}>{user.user.userName}</li>
                    <li className={style.dropdownItem}><Link className={style.link} to={'/documents'}>Мои документы</Link></li>
                    <li className={style.dropdownItem} onClick={handleClickLogoutBtn}>Выйти</li>
                </ul>
            </div>}
        </div>
    );
}