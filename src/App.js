import React, { Component } from 'react';

import './resources/App.css';
import BookRow from './components/BookRow';
import Title from './components/Title';
import Footer from './components/Footer';
import BookAddingWizard from './components/BookAddingWizard';

const API = "http://localhost:8080";
//const API = "http://192.168.43.166:8080";

// July 10th, 2018 - restarting app for the first time after 4 months

class App extends Component {
  constructor(){
    super();
    this.state={
      isWizardOpened:false,
      wizardPage:1,
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
    // fetch("api.openweathermap.org/data/2.5/weather?q=Sofia,bg&appid=b92c2b005932d8162e46d3633ec1971e")
    // .then( response => response.json())
    // .then( jsondata => this.setState({weather:jsondata}) )
    // .then(()=>{console.log(JSON.stringify(this.state.weather));});
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
  };
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
    if(e.target.value.length>=1){
      fetch(API+"/authors?s="+e.target.value, {mode: 'cors',headers:{'Access-Control-Allow-Origin':'*' },})
      .then( response => response.json())
      .then( jsondata => {
        let n = this.state.currentBook.authors.length;
        let result = jsondata;
        if(n>0){
          for(let i=0;i<n;i++){
            result = result.filter(auth => auth.id!==this.state.currentBook.authors[i].id);
          }
        }
        result.unshift(this.state.currentAuthor);
        this.setState({authorSuggest:result});}
      );
    }else{
      this.setState({authorSuggest:[]});
    }
  }
  showInfo = () => {
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
            authorSuggest:[],
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
      }finally{
        this.setState({isWizardOpened:false,wizardPage:1,currentBook:{id:0,title:"",isbn:"",authors:[]},
        currentAuthor:{name:""}});
      }
    }  
  }
  addAuthor = e => {
    if(e.name!==""){
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
  }
  deleteBook = (id,i) => {
    if (window.confirm('Are you sure you want to DELETE this book?')) {
      let booksCopy = this.state.books.slice();
      booksCopy.splice(i,1);
 
      fetch(API+"/delete?i="+id, {mode: 'cors',headers:{
      'Access-Control-Allow-Origin':'*' 
      },})
      .then( response => response.text())
      .then( msg => {
        this.setState({books:booksCopy});
        // window.alert(msg);
      });
    } else {
        // Do nothing!
    }
  }
  clearSelection = (authName) => {
    let newAuthor=this.state.currentBook.authors.filter(auth => auth.name!==authName)
    this.setState({
      currentBook:{
        id:this.state.currentBook.id,
        title:this.state.currentBook.title,
        isbn:this.state.currentBook.isbn,
        authors:newAuthor},
      currentAuthor:{name:""},
      authorSuggest:[]
    });
  }
  authorKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addAuthor(this.state.currentAuthor);
      // window.alert('do validate');
    }
  }
  closeWizard = () =>{
    this.setState({isWizardOpened:false,wizardPage:1,currentBook:{id:0,title:"",isbn:"",authors:[]},
    currentAuthor:{name:""}});
  }
  render() {
    let bookRows = this.state.books.map((e,i)=>{
      return(
        <BookRow key={i} book={e} delete={()=>this.deleteBook(e.id,i)}/>
      );
    });
    let openWizard=()=>{this.setState({isWizardOpened:!this.state.isWizardOpened});}
    let partTwo = ()=>{if(this.state.currentBook.title===""){
      window.alert("Title can not be an empty field!");
      }else{this.setState({wizardPage:2});}}
    // let partOne = ()=>{this.setState({wizardPage:1});}
    return (
      <div className="App">
        <Title/>
        <br/>
        You have {this.state.books.length}&nbsp;
        {this.state.books.length===1?"book":"books"} in your library!
        <br/><br/><div onClick={openWizard} className="customButton2">Add new book</div><br/>
        {/* {this.state.weather} */}


{/* ----------------------------------------------------------------------------------------------------- */}

      <BookAddingWizard 
        currentBook   ={this.state.currentBook}
        currentAuthor ={this.state.currentAuthor}
        authorSuggest ={this.state.authorSuggest}
        onTitleChange ={this.onTitleChange}
        onIsbnChange  ={this.onIsbnChange}
        onAuthorChange={this.onAuthorChange}
        authorKeyPress={this.authorKeyPress}
        clearSelection={this.clearSelection}
        addAuthor     ={this.addAuthor}
        addBook       ={this.addBook}
        isWizardOpened={this.state.isWizardOpened}
        closeWizard   ={this.closeWizard}
        wizardPage    ={this.state.wizardPage}
        // partOne    ={this.partOne}
        partTwo       ={partTwo}
        />

{/* ----------------------------------------------------------------------------------------------------- */}


      <br/><br/><br/>
      <div id="bookList">
        {this.state.books.length===0?
          <h2>The list is empty!</h2>
          :
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
        }</div>
      <br/><br/><br/>

      <Footer/>
      </div>
    );
  }
}
export default App;