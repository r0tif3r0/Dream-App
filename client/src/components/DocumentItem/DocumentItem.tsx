import { Link } from 'react-router-dom';
import style from './DocumentItem.module.scss';
import dateFormat from "dateformat";
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';

export const DocumentItem = ({props}) => {

  const [modalActive, setModalActive] = useState(false);
  
    return (
        <div className={style.documentItem}>
        <div className={style.documentInfo}>
          <h3 className={style.documentName}>{props.title}</h3>
          <p className={style.documentDate}>{`Дата создания: ${dateFormat(props.createdTime, "isoTime")} ${dateFormat(props.createdTime, "paddedShortDate")}`}</p>
          <p className={style.documentOwner}>Иван Иванов</p>
        </div>
        <div className={style.documentActions}>
          <button onClick={() => setModalActive(true)} className={style.shareButton}>Поделиться</button>
          <Link to={`/documents/${props._id}`}>
            <button className={style.editButton}>Редактировать</button>
          </Link>
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          {<div><p>ID: {props._id}</p>
          <p>Пароль: {props.password}</p></div>}
        </Modal>
      </div>
    );
  }