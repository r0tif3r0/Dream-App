import { FormEvent, useState } from "react";
import style from './NewDoc.module.scss';
import { useSelector } from "react-redux";
import Select from "react-select";

const options = [
  { value: 'blank', label: 'Пустой документ' },
  { value: 'resolution', label: 'Постановление' },
  { value: 'order', label: 'Приказ' },
  { value: 'protocol', label: 'Протокол' },
  { value: 'disposition', label: 'Распоряжение' },
];

export const NewDoc = ({active, setActive} : {active:boolean, setActive:any}) => {

    const {user} = useSelector(state => state)
    const [selectedOption, setSelectedOption] = useState({ value: 'blank', label: 'Пустой документ' });

    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    
    const createDoc = async (title: string, password: string,) => {
      console.log(user.user.id)
      await fetch('http://localhost:5000/newdocument', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        mode: 'cors',
        body: JSON.stringify({
          title: title,
          password: password,
          userId: user.user.id,
          template: selectedOption.value,
        }),
      }).then((response) => {
        console.log(response);
        return response.json();
      })
        .then((resp) => {
          console.log(resp);
          if (resp.success === true) {
            console.log('Obtained docs!');
          } else {
            console.log('Error in making new document');
          }
        })
        .catch((err) => {
          console.log(`Error in making new document: ${err}`);
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createDoc(title, password)
    }
  
    return (
      <div className = {active ? `${style.newDoc} ${style.active}` : style.newDoc} onClick={() => setActive(false)}>
        <form className={active ? `${style.newDocForm} ${style.active}` : style.newDocForm} onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
            <div className={style.title__form}>
                <h3>Создать новый документ</h3>
            </div>
            <div className={`${style.input__field} ${style.title__field}`}>
                <p>Название:</p>
                <input type="text" placeholder='Название' className={`${style.input} ${style.input__title}`} onChange={(e) => setTitle(e.target.value)} value={title}/>
            </div>
            <div className={`${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Пароль' className={`${style.input} ${style.input__password}`} onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div className={`${style.input__field} ${style.templates}`}>
                <p>Выберите шаблон документа:</p>
                <div className={style.options}>
                <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                />
                </div>
            </div>
            <button type='submit' className={style.submit__btn}>
              <p>Создать</p>
            </button>
        </form>
      </div>
    );
  }