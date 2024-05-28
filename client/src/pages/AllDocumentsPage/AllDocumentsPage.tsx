import { FC, useEffect, useState } from "react";
import { Header } from '../../components/Header/Header';
import style from './AllDocumentsPage.module.scss';
import { Link } from "react-router-dom";
import { NewDoc } from '../../components/NewDoc/NewDoc'
import { CollabDoc } from "../../components/CollabDoc/CollabDoc";
import { DocumentItem } from "../../components/DocumentItem/DocumentItem";
import { useSelector } from "react-redux";

export const AllDocumentsPage: FC = () => {

    const {user} = useSelector(state => state)

    const [newDocActive, setNewDocActive] = useState(false)
    const [collabDocActive, setCollabDocActive] = useState(false)
    const [documents, setDocuments] = useState([])

    useEffect(() => {
      getMyDocs(user.user.id)
    }, []);

    const getMyDocs = async (userId : string) => {
        await fetch('http://localhost:5000/mydocs', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'userId': userId,
      },
      credentials: 'same-origin',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    })
      .then((resp) => {
        if (resp.success === true) {
          let shareArray = new Array(resp.docs.length);
          shareArray.fill(false);
          let myDocs = [...resp.docs];
          myDocs.forEach((doc) => {
            doc.isOwner = true;
          });
          setDocuments( myDocs )
        //   this.setState({ documents: resp.docs, share: shareArray });
        //   this.getCollabDocs();
        } else {
          console.log('Could not get your documents!');
        }
      })
      .catch((err) => {
        console.log(`Error in getting documents ${err}`);
      });
    }

    if (user !== undefined) return (
        <div className={style.container}>
            <Header />
            <div className={style.content}>
                <h1 className={style.title}>Мои документы</h1>
                <div className={style.buttonsBlock}>
                    <button onClick={() => setNewDocActive(true)}>Новый документ</button>
                    <button onClick={() => setCollabDocActive(true)}>Совместное редактирование</button>
                </div>
                <div className={style.docsList}>
                    <button className={style.refreshButton} onClick={() => getMyDocs(user.user.id)}></button>
                    {documents.map((doc) => (
                      <DocumentItem props={doc}/>
                    ))}
                </div>
            </div>
            <NewDoc active={newDocActive} setActive={setNewDocActive}/>
            <CollabDoc active={collabDocActive} setActive={setCollabDocActive}/>
        </div>
    )
}