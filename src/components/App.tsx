// src/components/App.tsx

import Click from './Click';
import Product from './Product';
import Button from './Button';

export default function App() {
  return (
    <>
      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <Click />
      <Click />
      <Button text="click me" variant="primary" />
      <Button text="click you" variant="secondary" />
    </>
  );
}
