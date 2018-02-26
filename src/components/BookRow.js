import React, { Component } from 'react';
class BookRow extends Component {
  render() {
    return (
      <tr>
      	<td>{this.props.book.id}.&nbsp;</td>
      	<td>{this.props.book.title}</td>
      	<td>{this.props.book.isbn}</td>
				<td>
					{typeof this.props.book.authors==='undefined'?"n/a":
									this.props.book.authors.length===0?"n/a":
									this.props.book.authors.map((a,i)=>{
										return i===0?(
											<span key={i}><div key={i} className="AuthorsShown">{a.name}</div></span>
										):(
											<span key={i}>,<div key={i} className="AuthorsShown">{a.name}</div></span>
										);
									})
					}
				</td>
      	
      	<td>
					{/* <button onClick={this.props.delete}>Delete</button> */}
				</td>

				<td><div onClick={this.props.delete} className="customButton">...</div></td>
      </tr>
    );
  }
}
export default BookRow;
