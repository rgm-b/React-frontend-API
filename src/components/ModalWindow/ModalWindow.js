function ModalWindow(props){
    if(props.show) {
        return (
            <div className="modal-background">
                <div className="container">
                    <div className="box-text-right">
                        <button onClick={props.closeModal} className="button-close">&#10006;</button>
                    </div>
                    <h3 className="title">{props.formTitleText}</h3>
                    <form className="form form_add" noValidate onSubmit={props.changeProduct}>
                        <div className="form__field-wrapper">
                            <label className="form__label form__label_font_bold" htmlFor="input-name">Название товара</label>
                            <input value={props.name} onChange={props.onChangeName} className="form__input" id="input-name" type="text" placeholder="Введите название" />
                        </div>

                        <div className="form__field-wrapper">
                            <label className="form__label form__label_font_bold" htmlFor="input-price">Цена товара</label>
                            <input value={props.price} onChange={props.onChangePrice} className="form__input" id="input-price" type="text" placeholder="Введите цену" />
                        </div>

                        <div className="form__field-wrapper">
                            <label className="form__label form__label_font_bold" htmlFor="input-file">Изображение товара</label>
                            <input value={props.price} onChange={props.onChangeFile} className="form__input" id="input-file" type="file" placeholder="Введите пароль" />
                        </div>

                        <div className="form__button-wrapper">
                            <button className="form__button">{props.formTitleText}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return null;

}

export default ModalWindow;