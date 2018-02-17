import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import BookRow from './BookRow';
const API = "http://localhost:8080";
//const API = "http://192.168.43.166:8080";  v0.2.1
const Title = styled.h1`
	font-size:2.1em;
	text-align: center;
	color: palevioletred;
	user-select:none;
	cursor:default;
	margin-top:18px;
`;
class App extends Component {
  constructor(){
    super();
    this.state={
      count:0,
      books:[],
      currentBook:{
      	id:0,
        title:"",
        isbn:"",
        authors:[{name:""}]
      },
      urlBooks:[]
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
      currentBook:{
      	id:this.state.currentBook.id,
        title:this.state.currentBook.title,
        isbn:this.state.currentBook.isbn,
        authors:[{name:e.target.value}]
      }
    });
  }
  showInfo = () =>{
    console.log("Hello there!");
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
              currentBook:{id:0,title:"",isbn:"",authors:[{name:""}]}
          });
        });
      }catch(exception){
        window.alert("Something went wrong");
      }
    }  
  }
  deleteBook = (id,i) =>{
    if (window.confirm('Are you sure you want to DELETE this book?')) {
      let booksCopy = this.state.books.slice();
      booksCopy.splice(i,1);
 
      fetch(API+"/delete?i="+id, {mode: 'cors',headers:{
      'Access-Control-Allow-Origin':'*'
      },})
      .then( response =>response.text())
      .then( msg => this.setState({books:booksCopy}));
    } else {
        // Do nothing!
    }
  }
  render() {
    let bookRows = this.state.books.map((e,i)=>{
      return(
        <BookRow key={i} book={e} delete={()=>this.deleteBook(e.id,i)}/>
      );
    });
    return (
      <div className="App">

      <Title>Simple SPA CRUD - Book Library</Title>
      <br/>
      <br/>
      You have {this.state.books.length}&nbsp;
      {this.state.books.length===1?"book":"books"}&nbsp;
      in your library!
      <br/>
      {/* {this.state.currentBook.authors[0].name} */}
      <br/>
      <br/>
      <input
        placeholder="Book Title"
        size="10"
        onChange={this.onTitleChange}
        value={this.state.currentBook.title}/>
      <input
        placeholder="ISBN"
        size="10"
        onChange={this.onIsbnChange}
        value={this.state.currentBook.isbn}/>
      <input
        placeholder="Author(s)"
        size="10"
        onChange={this.onAuthorChange}
        value={this.state.currentBook.authors[0].name}/>
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
