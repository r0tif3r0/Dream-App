import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import style from './SignupPage.module.scss';
import { FC, FormEvent, useState } from 'react';
import $api from '../../http/axios.api';
import { Modal } from '../../components/Modal/Modal';

interface IUserName {
  firstName: string,
  lastName: string
}

export const SignupPage : FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState<IUserName>({
      firstName: '',
      lastName: ''
    })

    const navigate = useNavigate();

    const removeInputValue = () => {
      setEmail('')
      setPassword('')
      setUserName({
        firstName: '',
        lastName: ''
      })
    }

    const [modalActive, setModalActive] = useState(false)
    const [message, setMessage] = useState('');

    const sugnup = async (email: string, password: string, userName: IUserName) => {
      try {
        setMessage(`Для подтверждения почты и активации аккаутна перейдите по ссылки, присланной на ${email}`);
        setModalActive(true);
        removeInputValue()
        const response = await $api.post('/registration', {email, password, userName: `${userName.firstName} ${userName.lastName}`})
        localStorage.setItem('token', response.data.accessToken)
      } catch (e) {
        console.log(e)
        setMessage(e.response.data.message);
        setModalActive(true);
      }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      sugnup(email, password, userName)
    }

    return (
        <div className={style.container}>
            <Header/>
            <section className={style.content}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.title__form}>
                  <h3>Регистрация</h3>
              </div>
              <div className={`${style.input__field} ${style.userName__field}`}>
                <p>Имя:</p>
                <input type="text" placeholder='Введите имя' className={`${style.input} ${style.input__userName}`} value={userName.firstName} onChange={(e) => setUserName((prev) => ({...prev, firstName: e.target.value}))}/>
              </div>
              <div className={`${style.input__field} ${style.userLastName__field}`}>
                <p>Фамилия:</p>
                <input type="text" placeholder='Введите фамилию' className={`${style.input} ${style.input__userLastName}`} value={userName.lastName} onChange={(e) => setUserName((prev) => ({...prev, lastName: e.target.value}))}/>
              </div>
              <div className={`${style.input__field} ${style.email__field}`}>
                <p>Email:</p>
                <input type="email" placeholder='Введите email' className={`${style.input} ${style.input__email}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className={`${style.input__field} ${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Введите пароль' className={`${style.input}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type='submit' className={style.submit__btn}>
                  <p>Зарегистрироваться</p>
              </button>

              <p className={style.no__acc}>Уже зарегистрированы? <Link to={'/login'}>Войти</Link></p>
            </form>
            </section>
            <Modal active={modalActive} setActive={setModalActive}>
              {message}
            </Modal>
        </div>
    )
}