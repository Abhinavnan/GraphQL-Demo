import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author {
        name
      }
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.books.map(book => (
        <li key={book.id}>{book.title} by {book.author.name}</li>
      ))}
    </ul>
  );
}

export default Books;