import style from './Modal.module.scss'

export const Modal = ({active, setActive, children}) => {
    return (
        <div className = {active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={active ? `${style.modal__content} ${style.active}` : style.modal__content} onClick={e => e.stopPropagation()}>
                <p>{children}</p>
            </div>
        </div>
    )
}