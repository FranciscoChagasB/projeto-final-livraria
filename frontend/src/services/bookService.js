import axios from 'axios';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const getBookCover = async (isbn) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`);
    const book = response.data.items ? response.data.items[0] : null;
    if (book && book.volumeInfo.imageLinks) {
      return book.volumeInfo.imageLinks.thumbnail;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter a capa do livro', error);
    return null;
  }
};
