import './ShoppingCart.css';
import {Link} from "react-router-dom";
import React from "react";

function ShoppingCart(props){

    const shoppingList =
    props.orders.map( (item, index) => {
        return (
            <div className="tabl__row" key={index} data-id={item._id}>
                <div className="tabl__name">{item.product.name}</div>
                <div className="tabl__price">{item.product.price}</div>
                <div className="tabl__quantity">{item.quantity}</div>
                <button onClick={props.deleteProductFromCart} className={"tabl_delete"}>Удалить</button>
           </div>
        )
    });

    const result = props.orders.reduce((sum, cur)=>{
        return sum + cur.product.price;
    }, 0)

    if(shoppingList.length > 0){
        return(
            <div className="shopping-cart">
                <div className="card-menu">
                    <h1 className="shopping-cart__title">
                        Корзина товаров
                    </h1>
                    <Link to={'/'} className="button">Вернуться к списку товаров</Link>
                </div>

                <div className="tabl">
                    <div className="tabl__row tabl__row_head">
                        <div className="tabl__name">Название товара</div>
                        <div className="tabl__price">Цена, руб</div>
                        <div className="tabl__quantity tabl_border_none">Количество</div>
                    </div>
                    {shoppingList}
                    <div className="tabl__row tabl__row_head">
                        <div className="tabl__name">Итого</div>
                        <div className="tabl__price tabl_border_none">{result} руб</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="shopping-cart">
            <div className="card-menu">
                <h1 className="shopping-cart__title">
                    Корзина товаров
                </h1>
                <Link to={'/'} className="button">Вернуться к списку товаров</Link>
            </div>
            <h2 className="shopping-cart__default-title">В вашей корзине ничего нет</h2>
        </div>
    )

}

export default ShoppingCart;