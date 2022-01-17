import React from "react";

import './Sign.css';

class Sign extends React.Component{

    render(){

        return (
            <div className="Sign">
                <div className="container">
                    <h3 className="title">{this.props.formTitleText}</h3>
                    <form className="form" id="form" noValidate onSubmit={this.props.onSubmit}>
                        <div className="form__field-wrapper">
                            <label className="form__label form__label_font_bold" htmlFor="input-email">Email</label>
                            <input value={this.props.email} onChange={this.props.onChangeEmail} className="form__input" id="input-email" type="email" placeholder="Введите email" />

                        </div>
                        <div className="form__field-wrapper">
                            <label className="form__label form__label_font_bold" htmlFor="input-password">Пароль</label>
                            <input value={this.props.password} onChange={this.props.onChangePassword} className="form__input" id="input-password" type="password" placeholder="Введите пароль" />

                        </div>
                        <div className="form__button-wrapper">
                            <button className="form__button">{this.props.formTitleText}</button>
                        </div>
                    </form>
                </div>
            </div>
        );

    }

}

export default Sign;