import type Article from '../types/typeArticle';

interface ArticleListProps {
  items: Article[];
}

export default function ArticleList({ items }: ArticleListProps) {
  return (
    <ul>
      {items.map(({ objectID, url, title }) => (
        <li key={objectID}>
          <a href={url} target="_blank">
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}
