import "./App.css";
import React from "react";
import {Routes, Route} from "react-router-dom";

import Sign from "./components/Sign/Sign";
import Menu from "./components/Menu/Menu";
import Cards from "./components/Cards/Card";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import ProductCard from "./components/ProductCard/ProductCard";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            pathname: 'user/login',
            method: '',
            formTitleText: 'Вход',
            token: null,
            products: [],
            name: '',
            price: 0,
            productImage: '',
            show: false,
            id:'',
            orders: [],
            singleProductName:'',
            singleProductPrice:'',
            singleProductImage:'',
        };
    };

    clickRegistration = () => {
        this.setState({
            email: '',
            password: '',
            formTitleText: 'Регистрация',
            pathname: 'user/signup'
        });
    };

    clickEntry = () => {
        this.setState({  //
            email: '',
            password:'',
            formTitleText: 'Вход',
            pathname: 'user/login',
        });
    };

    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    onChangePassword = (event) => {
        this.setState({password: event.target.value});
    };

    requestServer(pathname, method, headers, body, setState ){
        fetch(`http://localhost:3001/${pathname}`,
            {
                method,
                headers,
                body
            }
        )
        .then(response => {
            return response.json()
        })
        .then(data => {

            const message = data.message;

            // регистрация
            if(data.message === 'User created'){
                // для автоматической замены формы Регистрация на форму ВХОД после успешной регистрации
                this.setState(setState);
            }else if(data.message === 'Mail exists'){
                alert('Данный Email существует!');
            }

            if(message === 'Auth faild'){
                alert('Такого пользователя не существует');
            }

            //успешно вошли в приложение
            if(data.token){
                this.setState({token: data.token});
            }

           if( message === 'Auth successful' ||
               message === 'Product created' ||
               message === 'Product updated!' ||
               message === 'Product deleted!')
           {
                this.getProductList();
           }

            if(data.orders){
                this.setState({orders: data.orders})
            }

            if(message === 'Order successfully deleted'){
                this.getShoppingList();
            }

            if(data.product){
                this.setState({singleProductName: data.product.name});
                this.setState({singleProductPrice: data.product.price});
                this.setState({singleProductImage: data.product.productImage});
            }

        })
    }

    onSubmit = (event) => {
        event.preventDefault();

        if(this.state.email && this.state.password){
            this.requestServer(
                this.state.pathname,
                'post',
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                {
                    pathname: 'user/login',
                    email: '',
                    password:'',
                    formTitleText: 'Вход',
                }
            )
        }
    };

    getProductList = () => {
        fetch('http://localhost:3001/products')
        .then((res) => res.json())
        .then((data)=>{
            this.setState({products: data.products});
        })
    };

    onChangeName = (event) => {
        this.setState({name: event.target.value})
    }
    onChangePrice = (event) => {
        this.setState({price: Number(event.target.value)})
    }
    onChangeFile = (event) => {
        this.setState({productImage: event.target.files[0]})
    }

    deleteProduct = (event) => {
       const id = event.target.parentNode.parentNode.getAttribute('data-id');

       this.requestServer(
            `products/${id}`,
            'DELETE',
           {'Authorization': 'token ' + this.state.token}
        )
    }

    showModalEdit = (event) => {
        const id = event.target.parentNode.parentNode.getAttribute('data-id');
        this.setState({show: !this.state.show})
        this.setState({id: id})
        this.setState({formTitleText: 'Редактировать'})
        this.setState({method: 'PATCH'})
        this.setState({pathname: `products/${id}`})
    }

    showModalAdd = () =>{
        this.setState({show: !this.state.show})
        this.setState({formTitleText: 'Добавить'})
        this.setState({method: 'POST'})
        this.setState({pathname: 'products'})
    }

    closeModal = () => {
        this.setState({show: !this.state.show})
    }

    changeProduct = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productimage", this.state.productImage);
        formData.append("name", this.state.name );
        formData.append("price", this.state.price );

        this.requestServer(
            this.state.pathname,
            this.state.method,
            {'Authorization': 'token ' + this.state.token},
            formData
        )
    }

    //Добавляем товар в корзину
    addToShoppingCart = (event) => {
        const id = event.target.parentNode.getAttribute('data-id');

        this.requestServer(
            'orders',
            'POST',
            {
                'Authorization': 'token ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            JSON.stringify(
            { productId: id,
                quantity: 1
            })
        )
    }

    deleteProductFromCart = (event) => {
        const id = event.target.parentNode.getAttribute('data-id');
        const pathname = `orders/${id}`;

        this.requestServer(
            pathname,
            'DELETE',
            {'Authorization': 'token ' + this.state.token}
        )
    }

    //выводим список товаров
    getShoppingList = () => {
        this.requestServer(
            'orders',
            'GET',
            {'Authorization': 'token ' + this.state.token}
        )
    }

    goToProductCart = (event) => {

        const id = event.target.parentNode.parentNode.getAttribute('data-id');
        const pathname = `products/${id}`;

       this.requestServer(
            pathname,
            'GET',
            {'Authorization': 'token ' + this.state.token}
        )


    }

    exit = () => {
        this.setState({token: null})
        this.setState({formTitleText: 'Вход'})
        this.setState({method: 'POST'})
        this.setState({pathname: 'user/login'})
    }

    render() {

        if (!this.state.token) {
            return(
                <>

                    <Menu
                        clickRegistration = {this.clickRegistration}
                        clickEntry = {this.clickEntry}
                    />

                    <Sign
                        formTitleText = {this.state.formTitleText}
                        email = {this.state.email}
                        password = {this.state.password}
                        onChangeEmail={this.onChangeEmail}
                        onChangePassword={this.onChangePassword}
                        onChangeCheckbox={this.onChangeCheckbox}
                        onSubmit={this.onSubmit}
                    />

                </>

            );
        }

        return(
            <>
                <ModalWindow
                    show={this.state.show}
                    closeModal={this.closeModal}

                    changeProduct={this.changeProduct}

                    onChangeName={this.onChangeName}
                    onChangePrice={this.onChangePrice}
                    onChangeFile={this.onChangeFile}

                    formTitleText={this.state.formTitleText}
                />
                <Routes>
                    <Route path={"/"} element={
                        <Cards
                            products={this.state.products}
                            onChangeName={this.onChangeName}
                            onChangePrice={this.onChangePrice}
                            onChangeFile={this.onChangeFile}

                            exit={this.exit}
                            deleteProduct={this.deleteProduct}

                            showModalEdit={this.showModalEdit}
                            showModalAdd={this.showModalAdd}
                            changeProduct={this.changeProduct}

                            addToShoppingCart={this.addToShoppingCart}

                            getShoppingList={this.getShoppingList}

                            goToProductCart={this.goToProductCart}
                        />
                    }/>
                    <Route path={'shopping-cart'} element={
                        <ShoppingCart
                            orders={this.state.orders}
                            deleteProductFromCart={this.deleteProductFromCart}
                        />
                    }/>

                    <Route path={'product-cart'} element={
                        <ProductCard
                            singleProductName={this.state.singleProductName}
                            singleProductPrice={this.state.singleProductPrice}
                            singleProductImage={this.state.singleProductImage}
                        />
                    }/>

                </Routes>
            </>
        );

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
     // console.log(this.state);
    }

}

export default App;
