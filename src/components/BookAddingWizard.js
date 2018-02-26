import React, { Component } from 'react';
class BookAddingWizard extends Component{
    render() {
        if(this.props.isWizardOpened){
            let selectedAuthors = 
                typeof this.props.currentBook.authors==="undefined"?""
                :this.props.currentBook.authors.map((a,i)=>{
                    return(
                    <div className="selectedAuthor" key={i}>
                        {a.name} 
                        <div className="removeAuth" key={i} onClick={() => this.props.clearSelection(a.name)}>
                        X
                        </div>
                    </div>
                );
            });
            let authSugg = 
                this.props.authorSuggest.map((a,i)=>{
                return(
                    <li key={i} onClick={() => this.props.addAuthor(a)}>{a.name}</li>
                );
            });
            if(this.props.wizardPage===1){
            return (
            <div className="BookAddingWizard">
                <span>BookAddingWizard here!</span>
                <div className="step1">
                    <br/><br/>
                    <div className="titleContainer">
                        <input
                        placeholder="Book Title"
                        size="10"
                        onChange={this.props.onTitleChange}
                        value={this.props.currentBook.title}
                        />
                    </div>
                    <br/><br/>
                    <div className="isbnContainer">
                        <input
                        placeholder="ISBN"
                        size="10"
                        onChange={this.props.onIsbnChange}
                        value={this.props.currentBook.isbn}/>
                    </div>
                    <br/><br/>
                    <div onClick={this.props.partTwo} className="nextButton">Next</div>
                    <div onClick={this.props.closeWizard} className="closeButton">Close</div>
                </div>
            </div>);
            }else if(this.props.wizardPage===2){
                return (
            <div className="BookAddingWizard">
                <span>BookAddingWizard here!</span>
                <div className="step2">
                <br/><br/>
                {selectedAuthors}<br/><br/>
                <div className="authContainer">
                    <div className="authInput">
                    <input
                        type="text"
                        id="authors" 
                        placeholder="Author(s)"
                        size="10"
                        onChange={this.props.onAuthorChange}
                        value={this.props.currentAuthor.name}
                        onKeyPress={this.props.authorKeyPress}/>
                    <div id="authList">{authSugg}</div>
                    </div>
                </div>
                <br/><br/>
                <div onClick={this.props.addBook} className="addButton">Save</div>
                <div onClick={this.props.closeWizard} className="closeButton">Close</div>
                </div>
            </div>);
            }
        }else{return null}
    }
}
export default BookAddingWizard;