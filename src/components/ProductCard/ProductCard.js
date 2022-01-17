import './ProductCart.css';
import {Link} from "react-router-dom";

function ProductCard(props){
    return(
        <div>
            <div className="card-menu">
                <h1 className="shopping-cart__title">
                    Карточка товара
                </h1>
                <Link to={'/'} className="button">Вернуться к списку товаров</Link>
            </div>

            <div className="single-product">
                <div className="single-product__box-img">
                    <img src={props.singleProductImage}
                         alt={props.singleProductName}
                         className="single-product__img"
                    />

                </div>
                <div className="single-product__params">
                    <div className="single-product__param"><b>Название товара:</b> {props.singleProductName}</div>
                    <div className="single-product__param"><b>Цена:</b> {props.singleProductPrice} руб</div>
                    <div className="single-product__desc"><b>Описание товара:</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam asperiores doloremque perspiciatis totam? Aliquam amet, architecto, aspernatur aut autem blanditiis commodi consectetur consequuntur eum facilis id illum iure nihil, nobis officiis quam quas quasi qui quidem reiciendis tempora unde? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam asperiores doloremque perspiciatis totam? Aliquam amet, architecto, aspernatur aut autem blanditiis commodi consectetur consequuntur eum facilis id illum iure nihil, nobis officiis quam quas quasi qui quidem reiciendis tempora unde?</div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;