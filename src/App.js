import React from 'react';
import axios from 'axios';
import './App.css';
import { Modal, Table } from './components';
import { base_url } from './constants';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	componentDidMount() {
		this.getBooks();
	}

	getBooks = async () => {
		const books = await axios.get(`${base_url}/books`);
		this.setState({ books: books.data });
	};

	handleEditRow = (book) => {
		this.setState({ show: true, header: 'Edit Book', book });
	};

	editBook = async (data) => {
		if (this.state.book.title !== data.title || this.state.book.author !== data.author) {
			const book = { ...this.state.book, title: data.title, author: data.author };
			const res = await axios.put(`${base_url}/books/${book.id}`, book);
			if (res.data) {
				const { books } = this.state;
				const index = books.findIndex((book) => book.id === this.state.book.id);
				books[ index ].title = data.title;
				books[ index ].author = data.author;
				this.setState({ book: null, books });
			}
		}
		this.hideModal();
	};

	handleDelete = async (book) => {
		const res = await axios.delete(`${base_url}/books/${book.id}`);
		if (res.status === 200) {
			const { books } = this.state;
			const index = books.findIndex((stateBook) => stateBook.id === book.id);
			books.splice(index, 1);
			this.setState({ books });
		}
	};

	hideModal = () => {
		this.setState({ show: false, header: '' });
	};
	handleSubmit = (data) => {
		if (data.isEdit) {
			this.editBook(data);
		} else {
			this.addBook(data);
		}
		this.hideModal();
	};
	addBook = (data) => {
		axios.post(`${base_url}/books`, data)
			.then((res) => {
				this.setState({ book: null });
				const { books } = this.state;
				books.push(res.data);
				this.setState({ books });
			});
	};
	showModal = () => {
		this.setState({ show: true, header: 'Add Book' });
	};

	render() {
		return (
			<div className="App">
				<button onClick={this.showModal}>
					Add Book
				</button>
				{this.state.show &&
				<Modal
					header={this.state.header}
					handleSubmit={this.handleSubmit}
					handleClose={this.hideModal}
					data={this.state.book}
				/>}
				{this.state.books &&
				<Table
					books={this.state.books}
					handleDeleteRow={this.handleDelete}
					handleEditRow={this.handleEditRow}/>}
			</div>
		)
	}
}

export default App;
