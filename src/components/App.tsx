// src/components/App.tsx

import Click from './Click';
import Product from './Product';
import Button from './Button';
import Input from './Input';
import SearchForm from './SearchForm';
import axios from 'axios';
import { useState } from 'react';
import ArticleList from './Article';

import type Article from '../types/typeArticle';
import Arr from './Component';
import Modal from './Modal';

interface ArticlesHttpResponse {
  hits: Article[];
}

export default function App() {
  const handleUser = (data: string) => {
    console.log('Order received from:', data);
  };

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModalWindow() {
    setIsModalOpen(!isModalOpen);
  }

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<ArticlesHttpResponse>(
        `https://hn.algolia.com/api/v1/search?query=${topic}`
      );
      setIsLoading(false);
      setArticles(data.hits);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Input onUser={handleUser} />
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      <Arr />

      <div>
        <h1>Main content of the page</h1>
        <button onClick={openModalWindow}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
            {' '}
            <h2>Custom Modal Content</h2>
            <p>This is a reusable modal with dynamic content.</p>
          </Modal>
        )}
      </div>
    </>
  );
}
