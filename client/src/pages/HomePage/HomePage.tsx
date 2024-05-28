import { Link} from 'react-router-dom';
import style from './HomePage.module.scss';
import { Header } from '../../components/Header/Header';
import { useSelector } from 'react-redux';

export default function HomePage() {

    const {user} = useSelector(state => state)

    return (
        <div className={style.container}>
            <Header />
            <div className={style.content}>
                <h1 className={style.title}>Добро пожаловать в DREAM</h1>
                <p className={style.subtitle}>Document Repository for Efficient Administration Management</p>
                <div className={style.features}>
                    <div className={style.feature}>
                        <h2>Удобное хранение документов</h2>
                        <p>Сохраняйте все ваши документы в одном месте с легким доступом и управлением.</p>
                    </div>
                    <div className={style.feature}>
                        <h2>Эффективное управление</h2>
                        <p>Организуйте свои документы, управляйте доступом и отслеживайте изменения.</p>
                    </div>
                    <div className={style.feature}>
                        <h2>Возможность использовать готовые шаблоны</h2>
                        <p>Выбирайте из готовых шаблонов для быстрого создания документов и форм.</p>
                    </div>
                </div>
                {!user.isAuth && <div className={style.loginForm}>
                    <h2>Вход в систему</h2>
                    <div>
                        <Link to={'/signup'}>
                            <button>Зарегистрироваться</button>
                        </Link>
                    </div>
                    <p>Уже зарегистрированы? <Link to={'/login'}>Войдите здесь</Link></p>
                </div>}
            </div>
        </div>
    )
}