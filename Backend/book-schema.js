const {GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} = require('graphql');

const books = [
    { id: 1, title: '1984', authorId: 1 },
    { id: 2, title: 'To Kill a Mockingbird', authorId: 2 },
    { id: 3, title: 'The Great Gatsby', authorId: 3 },
    { id: 4, title: 'Pride and Prejudice', authorId: 4 },
    { id: 5, title: 'Moby-Dick', authorId: 5 },
    { id: 6, title: 'War and Peace', authorId: 6 },
    { id: 7, title: 'The Catcher in the Rye', authorId: 7 },
    { id: 8, title: 'The Hobbit', authorId: 8 },
    { id: 9, title: 'Brave New World', authorId: 9 },
    { id: 10, title: 'Crime and Punishment', authorId: 10 },
];

const authors = [
    { id: 1, name: 'George Orwell' },
    { id: 2, name: 'Harper Lee' },
    { id: 3, name: 'F. Scott Fitzgerald' },
    { id: 4, name: 'Jane Austen' },
    { id: 5, name: 'Herman Melville' },
    { id: 6, name: 'Leo Tolstoy' },
    { id: 7, name: 'J.D. Salinger' },
    { id: 8, name: 'J.R.R. Tolkien' },
    { id: 9, name: 'Aldous Huxley' },
    { id: 10, name: 'Fyodor Dostoevsky' },
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Author of a book',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of books by the author',
            resolve: (author) => books.filter(book => book.authorId === author.id),
        }
    }),
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A book',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) =>  authors.find(author => author.id === book.authorId),
        },
    }),
});

const rootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            description: 'Get a book by ID',
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => books.find(book => book.id === args.id),
        }, // return a single book by ID
        books: {
        type: new GraphQLList(BookType),
        description: 'List of Books',
        resolve: () => books, 
        },
        author: {
            type: AuthorType,
            description: 'Get an author by ID',
            args: { id: { type: GraphQLInt } },
            resolve: (parent, args) => authors.find(author => author.id === args.id),
        }, // return a single author by ID
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of Authors',
            resolve: () => authors,
        },
    },
});

const rootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: {
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                const newBook = { id: books.length + 1, title: args.title, authorId: args.authorId };
                books.push(newBook);
                return newBook;
            },
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const newAuthor = { id: authors.length + 1, name: args.name };
                authors.push(newAuthor);
                return newAuthor;
            },
        },
    },
}); // same as post, delete, put, patch in REST API

const schema = new GraphQLSchema({
    query: rootQueryType,
    mutation: rootMutationType,
});

module.exports = schema;