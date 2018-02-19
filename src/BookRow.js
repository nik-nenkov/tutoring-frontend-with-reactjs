import React, { Component } from 'react';
function concatAuthors(e){
	let str=e[0].name;
	for(let i=1;i<e.length;i++){
		str=str+", "+e[i].name;
	}
	return str;
}
var buttonStyle = {
	cursor:"pointer"
}
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
										concatAuthors(this.props.book.authors)
					}
				</td>
      	<td><button onClick={this.props.delete} style={buttonStyle}>Update</button></td>
      	<td><button onClick={this.props.delete}>Delete</button></td>
      </tr>
    );
  }
}
export default BookRow;
