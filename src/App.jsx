import { useState } from 'react';
import './App.scss';

const products =
  [
    {
      "id": 1,
      "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
      "price": 64,
      "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      "quantity": 1
    },
    {
      "id": 2,
      "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      "price": 109,
      "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      "quantity": 1
    },
    {
      "id": 3,
      "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      "price": 109,
      "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      "quantity": 1
    },
    {
      "id": 4,
      "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      "price": 114,
      "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      "quantity": 1
    },
    {
      "id": 5,
      "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      "price": 599,
      "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      "quantity": 1
    },
    {
      "id": 6,
      "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
      "price": 999.99,
      "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      "quantity": 1
    },
  ]

export default function App() {
  const [initProducts, setInitProducts] = useState(products)
  function handleRmItem(id) {
    setInitProducts((products) => products.filter((item) => item.id !== id))
  }
  function handleQuantityChange(productID, quantity) {
    setInitProducts((products) => products.map((p) => (p.id === productID ? {...p, quantity: quantity} : p)))
  }
  return (
  <>
  <header>
    <h1>Shopping Cart</h1>
    You have <b>{initProducts.length}</b> product&#10098;s&#10099; in your cart
  </header>
  <div className='cart__item--list' role='list'>
    {
      initProducts.map((p) => (
          <CartItem onRmItem={handleRmItem} product={p} key={p.id} onQuantityChange={handleQuantityChange}/>
        )
      )
    }
  </div>
  <TotalAmount initProducts={initProducts}/>
  </>
  )
}

function CartItem({product, onRmItem, onQuantityChange}) {
  const [quantity, setQuantity] = useState("")
  function handleQuantityChange(ev, productID) {
    console.log(ev.target.value);
    const newQuantity = Number(ev.target.value)
    setQuantity(newQuantity)
    onQuantityChange(productID, newQuantity)
  }
  const totalProductPrice = product.price * product.quantity
  return (
  <div className="cart__item" role='list-item'>
    <img width="100" src={product.image} alt={product.title} className='cart__item--img'/>
    <div className="cart__item--details">
      <h4 className="cart__item--title">{product.title}</h4>
      <div className="quantity-control-btns">
        <div className="qc-btn">
          <label htmlFor="quantity">Quantity </label>
          <select name="Quantity" id="quantity" value={quantity}  onChange={(e) => handleQuantityChange(e, product.id)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <button className='removeButton' onClick={() => onRmItem(product.id)}>Remove</button>
      </div>
      <b>${totalProductPrice}</b>
    </div>
  </div>
  )
}

function TotalAmount({initProducts}) {
  const amount = initProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
  return (
    <p className="totalAmount">
      The total amount of your cart is <b>${amount}</b>
    </p>
  )
}
