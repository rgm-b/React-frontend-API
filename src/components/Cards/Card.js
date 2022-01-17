import './Cards.css';
import {Link} from "react-router-dom";


function Cards(props){

    const productList =
    props.products.map((product, index) => {
        return (
            <div className="card" key={index} data-id={product._id}>
                <div className="card__buttons">
                    <button onClick={props.showModalEdit} className="button">Редактировать</button>
                    <button onClick={props.deleteProduct} className="button button_right_none">Удалить</button>
                </div>

                <Link to={"product-cart"} onClick={props.goToProductCart} className="card__link">
                    <img className="card__img"
                         src={product.productImage}
                         alt={product.name}
                    />
                </Link>

                <div className="card__params">
                    <div className="card__title">{product.name}</div>
                    <div className="card__price">{product.price} руб</div>
                </div>
                <button onClick={props.addToShoppingCart} className="card__button-add-cart">В корзину</button>
            </div>
        )
    });

    return(
        <div>
            <div className="card-menu">
                <div className="card-menu__title">Личный кабинет администратора магазина</div>
                <Link to={"shopping-cart"} onClick={props.getShoppingList} className="button">
                    Перейти в корзину
                </Link>
                <button onClick={props.showModalAdd} className="button">
                    Добавить товар
                </button>
                <button onClick={props.exit} className="button">
                    Выйти
                </button>
            </div>

            <div className="cards">
                {productList}
            </div>
        </div>
    )
}


export default Cards;