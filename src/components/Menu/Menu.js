import './Menu.css';

function Menu(props){
    return(
        <div className="menu">
            <button className="button" onClick={props.clickRegistration}>Регистрация</button>
            <button className="button" onClick={props.clickEntry}>Вход</button>
        </div>
    )
}

export default Menu;