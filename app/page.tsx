"use client";
import data from "@/constants/data.json";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";

export interface cartItemType {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const addToCart = (name: string, category: string, price: number) => {
    if (cartItems.length === 0)
      setCartItems([{ name, category, price, quantity: 1 }]);
    else {
      setCartItems([...cartItems, { name, category, price, quantity: 1 }]);
    }
  };

  const increaseQuantity = (category: string) => {
    const updatedCartItem = cartItems.map((item) =>
      item.category === category
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCartItem);
  };
  const decreaseQuantity = (category: string) => {
    const prevItem = cartItems.find((item) => item.category === category);
    let updatedCartItem;

    if (prevItem && prevItem?.quantity > 1) {
      updatedCartItem = cartItems.map((item) =>
        item.category === category
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(updatedCartItem);
    } else {
      removeItemFromCart(category);
    }
  };

  const removeItemFromCart = (category: string) => {
    const updatedCartItem = cartItems.filter(
      (item) => item.category !== category
    );

    setCartItems(updatedCartItem);
  };

  return (
    <>
      <div className="container">
        <div className="desserts">
          <h1>Desserts</h1>
          <div className="items-container">
            {data.map((item, index) => (
              <div className="item" key={index}>
                <div className="thumbnail">
                  <Image
                    src={item.image.thumbnail}
                    fill
                    alt=""
                    sizes="(max-width: 375) 100vw "
                  />
                  {cartItems.length > 0 &&
                  cartItems.find((i) => i.category === item.category) ? (
                    <div className="add-to-cart item-added">
                      <div
                        className="counter-button"
                        data-counter="decrease"
                        onClick={() => decreaseQuantity(item.category)}
                      ></div>
                      <p>
                        {
                          cartItems.find((i) => i.category === item.category)
                            ?.quantity
                        }
                      </p>
                      <div
                        className="counter-button"
                        data-counter="increase"
                        onClick={() => increaseQuantity(item.category)}
                      ></div>
                    </div>
                  ) : (
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        addToCart(item.name, item.category, item.price);
                      }}
                    >
                      <Image
                        src="/assets/images/icon-add-to-cart.svg"
                        alt=""
                        width={16}
                        height={16}
                      />{" "}
                      Add to Cart
                    </button>
                  )}
                </div>

                <div className="desc">
                  <p className="category">{item.category}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart">
          <h2>
            Your Cart (
            {cartItems.reduce((acc, curr) => (acc += curr.quantity), 0)})
          </h2>
          {cartItems.map((cartItem, index) => (
            <div className="cart-item" key={index}>
              <div className="details">
                <p className="title">{cartItem.name}</p>
                <div className="item-added-details">
                  {" "}
                  <span className="count">{cartItem.quantity}x</span>{" "}
                  <span className="price">@ ${cartItem.price.toFixed(2)}</span>
                  <span className="total-price">
                    {" "}
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <div
                onClick={() => removeItemFromCart(cartItem.category)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src="/assets/images/icon-remove-item.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </div>
            </div>
          ))}

          <div className="cart-total">
            <p>Order Total</p>
            <p>
              $
              {cartItems.reduce(
                (acc, curr) => (acc += curr.price * curr.quantity),
                0
              )}
            </p>
          </div>
          {cartItems.reduce((acc, curr) => (acc += curr.quantity), 0) >= 10 ? (
            <div className="carbon" data-carbon="--neutral"></div>
          ) : (
            <div className="carbon"></div>
          )}
          <button
            onClick={() => {
              setShowModal(true);
            }}
            disabled={cartItems.length < 1}
          >
            Confirm Order
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          title="Confirm Your Order"
          subtitle="Got everything you want?"
          onConfirmation={() => {
            console.log("Order confirmed");
            setShowModal(false);
          }}
          onDecline={() => setShowModal(false)}
        />
      )}
    </>
  );
}
