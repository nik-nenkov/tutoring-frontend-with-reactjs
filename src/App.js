import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import BookRow from './BookRow';
//const API = "http://localhost:8080";
//const API = "http://192.168.0.100:8080";
const API = "http://192.168.43.166:8080";
const Title = styled.h1`
	font-size:2.1em;
	text-align: center;
	color: palevioletred;
	user-select:none;
	cursor:default;
	margin-top:18px;`;
class App extends Component {
  constructor(){
    super();
    this.state={
      authorSuggest:[],
      count:0,
      books:[],
      currentBook:{
      	id:0,
        title:"",
        isbn:"",
        authors:[]
      },
      urlBooks:[],
      currentAuthor:{
        id:0,
        name:""
      }
    };
  }
  componentDidMount(){
  	fetch(API+"/books?o=id",{mode: 'cors',headers:{'Access-Control-Allow-Origin':'*'}})
  	.then( response => response.json())
  	.then( jsondata => this.setState({books:jsondata}));
  }
  increment = () => {
    this.setState({count:this.state.count+1});
  }
  onTitleChange = e => {
    this.setState({
      currentBook:{
      	id:this.state.currentBook.id,
        title:e.target.value,
        isbn:this.state.currentBook.isbn,
        authors:this.state.currentBook.authors
      }
    });
  }
  onIsbnChange = e => {
    this.setState({
      currentBook:{
      	id:this.state.currentBook.id,
        title:this.state.currentBook.title,
        isbn:e.target.value,
        authors:this.state.currentBook.authors
      }
    });
  }
  onAuthorChange = e => {
    this.setState({
      currentAuthor:{
      	name:e.target.value
      }
    });

    e.target.value.length>=1?

    fetch(API+"/authors?s="+e.target.value, {mode: 'cors',headers:{
      'Access-Control-Allow-Origin':'*' 
      },})
      .then( response => response.json())
      .then( jsondata => this.setState({authorSuggest:jsondata}))
    
    :this.setState({authorSuggest:[]});
  }
  showInfo = () =>{
    window.alert("Hello there!");
  }
  addBook = () => {
  	if(this.state.currentBook.title===""){
  	window.alert("Title can not be an empty field!");
    }else{
      try{
        fetch(API+"/save_book", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(this.state.currentBook)
      })
      .then( response => response.json())
        .then( jsondata => this.setState({
          currentBook:{
            id:jsondata.id,
            title:jsondata.title,
            isbn:jsondata.isbn,
            authors:jsondata.authors
          }
        }))
        .then( ()		=> {
          let booksCopy = this.state.books.slice();
          booksCopy.push(this.state.currentBook);
          this.setState({
              books:booksCopy,
              currentBook:{id:0,title:"",isbn:"",authors:[]},
              currentAuthor:{name:""}
          });
        });
      }catch(exception){
        window.alert("Something went wrong");
      }
    }  
  }
  addAuthor = e =>{
    let authorsCopy = this.state.currentBook.authors.slice();
    let someAuth = {id:e.id,name:e.name};
    authorsCopy.push(someAuth);
    this.setState({
      currentBook:{
        id:this.state.currentBook.id,
        title:this.state.currentBook.title,
        isbn:this.state.currentBook.isbn,
        authors:authorsCopy
      },
      currentAuthor:{name:""},
      authorSuggest:[]
    });
  }
  deleteBook = (id,i) =>{
    if (window.confirm('Are you sure you want to DELETE this book?')) {
      let booksCopy = this.state.books.slice();
      booksCopy.splice(i,1);
 
      fetch(API+"/delete?i="+id, {mode: 'cors',headers:{
      'Access-Control-Allow-Origin':'*' 
      },})
      .then( response => response.text())
      .then( msg => this.setState({books:booksCopy}));
    } else {
        // Do nothing!
    }
  }
  clearSelection = () => {
    this.setState({
      currentBook:{
        id:this.state.currentBook.id,
        title:this.state.currentBook.title,
        isbn:this.state.currentBook.isbn,
        authors:[]},
      currentAuthor:{name:""},
      authorSuggest:[]
    });
  }
  render() {
    let authSugg = this.state.authorSuggest.map((a,i)=>{
      return(
        <li key={i} onClick={() => this.addAuthor(a)}>{a.name}</li>
      );
    });
    let bookRows = this.state.books.map((e,i)=>{
      return(
        <BookRow key={i} book={e} delete={()=>this.deleteBook(e.id,i)}/>
      );
    });
    let selectedAuthors = 
      typeof this.state.currentBook.authors==="undefined"?""
      :this.state.currentBook.authors.map((a,i)=>{
        return(<div className="selectedAuthor">{a.name} <div className="removeAuth">X</div></div>);
      }
    );
    return (
      <div className="App">

      <Title>Simple SPA CRUD - Book Library</Title>
      <br/>
      <br/>
      You have {this.state.books.length}&nbsp;
      {this.state.books.length===1?"book":"books"}&nbsp;
      in your library!
      <br/>
      <br/>
      {/* <button onClick={this.clearSelection}>Clear</button> */}
      <br/>
      <div id="titleContainer">
      <input
        placeholder="Book Title"
        size="10"
        onChange={this.onTitleChange}
        value={this.state.currentBook.title}/>
      </div>
      &nbsp;&nbsp;
      <div id="isbnContainer">
      <input
        placeholder="ISBN"
        size="10"
        onChange={this.onIsbnChange}
        value={this.state.currentBook.isbn}/>
      </div>
      &nbsp;&nbsp;
      <div id="authContainer">
        {selectedAuthors}
        <input
          type="text"
          id="authors" 
          placeholder="Author(s)"
          size="10"
          onChange={this.onAuthorChange}
          value={this.state.currentAuthor.name}/>
        <div id="authList">{authSugg}</div>
      </div>
      &nbsp;&nbsp;
      <button onClick={this.addBook}>Create</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <div id="bookList">
      <table>
      <tbody>
      <tr>
	      <th>ID</th>
	      <th>Book Title</th>
	      <th>ISBN</th>
	      <th>Author(s)</th>
	      <th></th>
	      <th></th>
      </tr>
      {bookRows}
      </tbody>
      </table>
      </div>
      <br/>
      <br/>
      {/* <button onClick={this.showInfo}>Say hi</button> */}
      <br/>
      <br/>
      <br/>
      Intellectual property of
      <br/>
      © 2018 Greenwall JSC.
      <br/>
      <br/>
      </div>
    );
  }
}
export default App;
