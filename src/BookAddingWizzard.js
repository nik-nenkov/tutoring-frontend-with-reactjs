import React, { Component } from 'react';

class BookAddingWizzard extends Component{
    render(){
        let authSugg = this.props.data.authorSuggest.map((a,i)=>{
    return(
        <li key={i} onClick={() => this.addAuthor(a)}>{a.name}</li>
    );
        });
        let selectedAuthors = 
        typeof this.props.data.currentBook.authors==="undefined"?""
        :this.props.data.currentBook.authors.map((a,i)=>{
            return(
            <div className="selectedAuthor" key={i}>
                {a.name} 
                <div className="removeAuth" key={i} onClick={() => this.clearSelection(a.name)}>
                X
                </div>
            </div>
            );
        }
        );
        return(<div className="BookAddingWizzard">
            <br/>
            <br/>
            <div id="titleContainer">
            <input
            placeholder="Book Title"
            size="10"
            onChange={this.onTitleChange}
            value={this.props.data.currentBook.title}/>
            </div>
            <div id="isbnContainer">
            <input
            placeholder="ISBN"
            size="10"
            onChange={this.onIsbnChange}
            value={this.props.data.currentBook.isbn}/>
            </div>
            <div id="authContainer">
            {selectedAuthors}
            <div className="authInput">
            <input
                type="text"
                id="authors" 
                placeholder="Author(s)"
                size="10"
                onChange={this.onAuthorChange}
                value={this.props.data.currentAuthor.name}
                onKeyPress={this.handleAuthorKeyPress}/>
            <div id="authList">{authSugg}</div>
            </div>
            </div>
            <div onClick={this.addBook} className="addButton">Create</div>
            <br/>
        </div>);
    }
}
export default BookAddingWizzard;