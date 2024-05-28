import { useState } from "react";
import style from './CollabDoc.module.scss';

export const CollabDoc = ({active, setActive} : {active:boolean, setActive:any}) => {

    const [docId, setDocId] = useState("")
    const [password, setPassword] = useState("")
  
    return (
      <div className = {active ? `${style.collabDoc} ${style.active}` : style.collabDoc} onClick={() => setActive(false)}>
        <div className={active ? `${style.collabDocForm} ${style.active}` : style.collabDocForm} onClick={e => e.stopPropagation()}>
            <div className={style.title__form}>
                <h3>Получить доступ к документу</h3>
            </div>
            <div className={`${style.input__field} ${style.title__field}`}>
                <p>Идентификатор документа:</p>
                <input type="text" placeholder='Идентификатор' className={`${style.input} ${style.input__title}`} onChange={(e) => setDocId(e.target.value)} value={docId}/>
            </div>
            <div className={`${style.input__field} ${style.email__password}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Пароль' className={`${style.input} ${style.input__password}`} onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button type='submit' className={style.submit__btn}>
              <p>Подключиться</p>
            </button>
        </div>
      </div>
    );
  }