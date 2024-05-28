import { FC, useEffect, useState } from "react";
import style from './DocMenu.module.scss';
import Select from "react-select";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";

const options = [
    { value: 'info', label: 'Информация' },
    { value: 'comments', label: 'Комментарии' },
    { value: 'versions', label: 'История версий' },
  ];

export const DocMenu: FC = () => {

    const {id: documentId} = useParams()
    const [currentDoc , setCurrentDoc] = useState();
    const [selectedOption, setSelectedOption] = useState({ value: 'info', label: 'Информация' });

    useEffect(() => {
        getCurrentDoc();
      }, []);

    const getCurrentDoc = async () => {
        if (documentId !== undefined){
        await fetch('http://localhost:5000/currentDoc', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'docid': documentId,
      },
      credentials: 'same-origin',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    })
      .then((resp) => {
        if (resp.success === true) {
            setCurrentDoc(resp.doc);
        } else {
          console.log('Could not get your documents!');
        }
      })
      .catch((err) => {
        console.log(`Error in getting documents ${err}`);
      });
    }
    }


    if (currentDoc !== undefined) return (
        <div className={style.menu}>
            <div className={style.content}>
                <p>Меню документа</p>
                <div className={style.options}>
                <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                />
                </div>
                {selectedOption.value == 'info' && <div className={style.docInfo}>
                        <p>Название: {currentDoc.title}</p>
                        <p>Тип шаблона: {currentDoc.template}</p>
                        <p>Дата создания: {dateFormat(currentDoc.createdTime, "isoTime")} {dateFormat(currentDoc.createdTime, "paddedShortDate")}</p>
                        <p>Дата изменения: {dateFormat(currentDoc.lastEditTime, "isoTime")} {dateFormat(currentDoc.lastEditTime, "paddedShortDate")}</p>
                        <p>Кем создан: Иван Иванов</p>
                        <p>У кого есть доступ: Иван Иванов, Кирилл Марков</p>
                    </div>}
                {selectedOption.value == 'comments' && <div className={style.docComments}>
                        <p>Иван Иванов: Заполнить требования приказа</p>
                        <p>Кирилл Марков: Прописать пункты приказа</p>
                        <div className={style.buttonsBlock}>
                            <button>Добавить</button>
                        </div>
                    </div>}
                {selectedOption.value == 'versions' && <div className={style.docVersions}>
                        <p>Версия от 17:04:28 05/12/2024</p>
                        <p>Версия от 21:56:13 05/21/2024</p>
                        <p>Версия от 14:23:42 05/25/2024</p>
                    </div>}
            </div>
            <div className={style.buttonsBlock}>
                <button>Сохранить</button>
                <button>Загрузить</button>
                <button>Скачать</button>
            </div>
        </div>
  )
    
}