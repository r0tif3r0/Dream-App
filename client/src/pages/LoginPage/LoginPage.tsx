import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import style from './LoginPage.module.scss'
import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthResponse } from '../../models/response/AuthResponse';
import $api from '../../http/axios.api';
import { setUser } from '../../redux/user/user.slice';
import { Modal } from '../../components/Modal/Modal';

export const LoginPage: FC = () => {
    useSelector((state) => state)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false)
    const [message, setMessage] = useState('');

    const login = async (email: string, password: string) => {
        try {
          const response = await $api.post<IAuthResponse>('/login', {email, password})
          localStorage.setItem('token', response.data.accessToken)
          dispatch(setUser(response.data.user))
          navigate('/')
        } catch (e) {
          console.log(e)
          setMessage(e.response.data.message);
          setModalActive(true);
        }
      }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className={style.container}>
            <Header />
            <section className={style.content}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <div className={style.title__form}>
                        <h3>Вход</h3>
                    </div>
                    <div className={`${style.input__field} ${style.email__field}`}>
                        <p>Email:</p>
                        <input type="email" placeholder='Ваш email' className={`${style.input} ${style.input__email}`} onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className={`${style.input__field} ${style.input__field}`}>
                        <p>Пароль:</p>
                        <input type="password" placeholder='Ваш пароль' className={`${style.input}`} onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                    <button type='submit' className={style.submit__btn}>
                        <p>Войти</p>
                    </button>

                    <p className={style.no__acc}><Link to={'/signUp'}>Забыли пароль?</Link></p>
                    <p className={style.no__acc}>У вас нет учетной записи? <Link to={'/signUp'}>Зарегистрироваться</Link></p>
                </form>
            </section>
            <Modal active={modalActive} setActive={setModalActive}>
                {message}
            </Modal>
        </div>
    )
}