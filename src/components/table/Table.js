import React from 'react';
import './Table.css';

export class Table extends React.Component {
	handleDeleteRowData = (book) => {
		const value = window.confirm(`Are you sure want to delete ${book.title}`)
		if (value) {
			this.props.handleDeleteRow(book);
		}
	};

	render() {
		return (
			<table border="1">
				<thead>
				<tr>
					<th>
						ID
					</th>
					<th>
						Title
					</th>
					<th>
						Author
					</th>
					<th>
						Action
					</th>
				</tr>
				</thead>
				<tbody>
				{this.props.books.map((book) => {
					return (
						<tr key={book.id}>
							<td>
								{book.id}
							</td>
							<td>
								{book.title}
							</td>
							<td>
								{book.author}
							</td>
							<td>
								<div onClick={this.props.handleEditRow.bind(null, book)}>edit</div>
								<br/>
								<div onClick={this.handleDeleteRowData.bind(null, book)}>delete</div>
							</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		);
	}
}
