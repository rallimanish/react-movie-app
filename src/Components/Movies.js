import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {

   async  componentDidMount(){
        //jo bhi side effect wala kaam e.g api calling wo is function mein higa taki component load hione se pehle hamara kaam chalna start kar de 
        
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=916392cd51c2d2edd776a4fb69c66f12&language=en-US&page=${this.state.currPage}`)
       // console.log(res)
        let data = res.data
       // console.log(data)
        this.setState({
            movies:[...data.results]
        })
    }


    constructor(){
       
        super()
        this.state={
            //hiver is just storing movie ID's
            hover:'',
            //parray bata rha ki abhi tak kitne page load hue hai
            parr:[1],
            currPage:1,
            //ek movies naam ka array banana padega jisme har page(jo api se call hoiga ) uski 20 movies load hongi 
            movies:[],
            //yeh id store karega hamari fav movies ki
            favourites: JSON.parse(localStorage.getItem('movies-app')) || []
        }
    }

    //yeh function current page k hisab se movies layega aur fir usse moviues wale array mein bhard dega
     changeMovies = async ()=>{
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=916392cd51c2d2edd776a4fb69c66f12&language=en-US&page=${this.state.currPage}`)
         let data = res.data
         this.setState({
             movies:[...data.results]
         })
    }

    //jab next button par click ho to Ui par 2 dikh jaye yeh 2 kaha se aa rha hai parray se
    handleRight = ()=>{
        let temparr =[]
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies) //changeMovies funtion ko callback mein dala qki setState async h hum chhte h pehle setSte chale n fir changeMovies wale fn ko call ho jaye
    }

    handleLeft = ()=>{
        if(this.state.currPage!==1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }

    handleClick = (value)=>{
        if(value!==this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!==movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

   
  render() {
   
      
    return (
      <>
          {
              this.state.movies.length===0?
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:
            <div>
            <h3 className='text-center'>Trending</h3>
                <div className='movies-list'>
                    {this.state.movies.map( (movieObj)=>(
                        <div className="card movies-card" onMouseEnter={ ()=>{this.setState({hover:movieObj.id})}}   onMouseLeave={()=>{this.setState({hover:''})}}>
                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-image" alt="..."/>
                                <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                <div className='button-wrapper'>
                                {
                                    this.state.hover===movieObj.id &&
                                    <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove":"Add"}</a>
                                }
                                    
                                </div> 
                        </div>
                    ))}
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>

                        {
                            this.state.parr.map( (value)=>(
                                <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>        
                            ))
                        }
                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                </nav>
                </div>
            </div>
          }
      </>
    )
  }
}
