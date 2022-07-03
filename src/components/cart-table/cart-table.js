import React from 'react';
import './cart-table.scss';
import { connect } from 'react-redux';
import { deleteFromCart, completeOrder } from '../../actions';
import RestoService from '../../services/resto-service';

const restoService = new RestoService();


const CartTable = ({items, deleteFromCart, completeOrder}) => {

    if(items.length === 0) {
        return(
            <div className="cart__title">Ваша корзина пуста!</div>
        )
    } else {
        return (
            <>
                <div className="cart__title">Ваш заказ:</div>
                <div className="cart__list">
                    {
                        items.map(item => {
                            const {title, price, url, id, counterIdentical } = item;

                            
                            return (
                                    <div key={id} className="cart__item">
                                        <img src={url} className="cart__item-img" alt={title}></img>
                                        <div className="cart__item-title">{title}</div>
                                        <div className='cart__item-counter'>Количество: {counterIdentical}</div>
                                        <div className="cart__item-price">Total: {counterIdentical * price}$</div>
                                        <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                                    </div>
                            )
                        })
                    }
                    <button variant="secondary" className='cart__btn' onClick={() => {restoService.setCart(items); completeOrder();}}>Оформить заказ</button>
                </div>
                
            </>
        );
    }
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    completeOrder
};



export default connect(mapStateToProps, mapDispatchToProps)(CartTable);