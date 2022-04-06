import React, { Component } from 'react'
import {movies} from './getMovies'

export default class Favourite extends Component {


    constructor(){
        super();
        this.state={
            genres:[],
            currGenre:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1
           
        }
    }

    componentDidMount(){
        console.log("mounting in favJS")
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        let data = JSON.parse(localStorage.getItem('movies-app')) || [];
        console.log("---->",data)
        let temp = []
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres')
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }

    handleGenreChange = (genre)=>{
        this.setState({
            currGenre:genre
        })
    }

    sortPopularityDesc=()=>{
        console.log("sort!!")
        let temp = this.state.movies
        temp.sort( function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })

    }
    sortPopularityAsc=()=>{
        console.log("sort11!!")
        let temp = this.state.movies
        temp.sort( function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })

    }
    sortRatingDesc=()=>{
        console.log("sort!!")
        let temp = this.state.movies
        temp.sort( function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        console.log("sort!!")
        let temp = this.state.movies
        temp.sort( function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }

    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    } 
    
    handleDelete = (id)=>{
        let newarr = [];
        newarr = this.state.movies.filter( (movieObj)=> movieObj.id !==id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
    }
  render() {
  
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filterArr = [];

    if(this.state.currText===''){
        filterArr=this.state.movies
    }else{
        filterArr=this.state.movies.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase())
        })
    }
    if(this.state.currGenre!=='All Genres'){
        filterArr = filterArr.filter((movieObj)=> genreids[movieObj.genre_ids[0]] === this.state.currGenre)
    }

    let pages = Math.ceil(filterArr.length/this.state.limit);
    console.log(pages,"PPP")
    let pagesarr = [];
    for(let i=1;i<=pages;i++){
        pagesarr.push(i);
    }
    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filterArr = filterArr.slice(si,ei);


    return (
      <>
          <div class="main">
                <div class="row">
                    <div class="col-3">
                        <ul class="list-group favourites-genres">
                        {
                            this.state.genres.map( (genre)=>(
                                this.state.currGenre===genre ?
                                <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li>
                                :
                                <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                            ))
                        }
                        </ul>
                    </div>
                    <div class="col-9 ">
                        <div class='row'>
                            <input type='text' class=' input-group-text col' placeholder='Search Movies' value = {this.state.currText} onChange={ (e)=>this.setState({currText:e.target.value})}></input>
                            <input type='number' class='input-group-text col' placeholder='Rows Count' value = {this.state.limit} onChange={ (e)=>this.setState({limit:e.target.value})} ></input>
                        </div>
                        <div class='row'>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                <th scope="col"> <i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                filterArr.map( (movieObj)=>(
                                    <tr>
                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'5rem'}} alt="..."/>{movieObj.original_title}</td>
                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                        <td>{movieObj.popularity}</td>
                                        <td>{movieObj.vote_average}</td>
                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                                
                               
                            </tbody>
                        </table>
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                
                                {
                                    pagesarr.map( (page)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                    ))
                                }
                                
                            </ul>
                        </nav>
                        
                    </div>
                    
                </div>
            </div>
      </>
    )
  }
}
