import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart, clearCart } from "../redux/action"; // make sure clearCart action exists
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const subtotal = state.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = state.reduce((acc, item) => acc + item.qty, 0);
  const shipping = state.length > 0 ? 30.0 : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal + shipping - discountAmount;

  const addItem = (product) => dispatch(addCart(product));
  const removeItem = (product) => dispatch(delCart(product));
  const handleClearCart = () => dispatch(clearCart());

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">Your Cart is Empty</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            <i className="fa fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3 d-flex justify-content-between">
                <h5 className="mb-0">Item List</h5>
                <button className="btn btn-danger btn-sm" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
              <div className="card-body">
                {state.map((item) => (
                  <div key={item.id}>
                    <div className="row d-flex align-items-center">
                      <div className="col-lg-3 col-md-12">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid"
                          width={100}
                          height={75}
                        />
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <p>
                          <strong>{item.title} (x{item.qty})</strong>
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6">
                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                          <button
                            className="btn btn-outline-secondary px-3"
                            onClick={() => removeItem(item)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <p className="mx-3 my-auto">{item.qty}</p>
                          <button
                            className="btn btn-outline-secondary px-3"
                            onClick={() => addItem(item)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>Subtotal: ${item.qty * item.price}</strong>
                        </p>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products ({totalItems}) <span>${Math.round(subtotal)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping <span>${shipping}</span>
                  </li>
                  {discount > 0 && (
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Discount (10%) <span>-${Math.round(discountAmount)}</span>
                    </li>
                  )}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${Math.round(total)}</strong>
                    </span>
                  </li>
                </ul>

                <div className="input-group my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button className="btn btn-outline-dark" onClick={applyCoupon}>
                    Apply
                  </button>
                </div>

                <Link to="/checkout" className="btn btn-dark btn-lg btn-block">
                  Go to checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
