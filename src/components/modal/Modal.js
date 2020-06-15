import React from 'react';
import './Modal.css';

export class Modal extends React.Component {
	state = {
		...this.returnStateObject()
	};

	returnStateObject() {
		let data = {
			title: '',
			author: '',
			errors: {
				title: '',
				author: ''
			},
			isEdit: false
		};
		if (this.props.data) {
			data.title = this.props.data.title;
			data.author = this.props.data.author;
			data.isEdit = true;
		}

		return data;
	}

	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case 'title':
				errors.title =
					value.length === 0
						? 'Required!'
						: value.length < 5
						? 'Title must be at least 5 characters long!'
						: '';
				break;
			case 'author':
				errors.author =
					value.length === 0
						? 'Required!'
						: value.length < 5
						? 'Author name must be at least 5 characters long!'
						: '';
				break;
			default:
				break;
		}

		this.setState({ errors, [name]: value });
	};
	validateForm = errors => {
		let valid = true;
		Object.values(errors).forEach(val => val.length > 0 && (valid = false));
		return valid;
	};
	handleSubmit = (event) => {
		event.preventDefault();
		let errors = this.state.errors;
		if (!this.state.title) {
			errors.title = 'Required';
		}
		if (!this.state.author) {
			errors.author = 'Required';
		}
		if (this.validateForm(errors)) {
			this.props.handleSubmit({ title: this.state.title, author: this.state.author, isEdit: this.state.isEdit });
		} else {
			this.setState({ errors });
		}
	};

	render() {
		let { errors, title, author } = this.state;
		const { header } = this.props;
		return (
			<div className="modal">
				<section className="modal-main">
					<h2>
						{header}
					</h2>
					<form name="bookForm">
						<div>
							<label>
								Name:
								<input type="text" name="title" value={title} onChange={this.handleChange}/>
								<br/>
								{errors.title.length > 0 &&
								<span className='error'>{errors.title}</span>}
							</label>
						</div>
						<div>
							<label>
								Author:
								<input type="text" name="author" value={author} onChange={this.handleChange}/>
								<br/>
								{errors.author.length > 0 &&
								<span className='error'>{errors.author}</span>}
							</label>
						</div>
						<br/>
						<button type="button" onClick={this.handleSubmit}>
							Submit
						</button>
						<button type="button" onClick={this.props.handleClose}>
							close
						</button>
					</form>
				</section>
			</div>
		);
	}
}
