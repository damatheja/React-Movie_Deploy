import React,{useState,useEffect} from 'react'
import "./styles/global.css"
import mockMovies from './data/mockMovies'
import MovieModal from './components/MovieModal';
import MovieCard from './components/MovieCard';
import Header from './components/Header';




const MOVIES_INITIAL = 20
const MOVIES_PER_LOAD = 10

const App = () => {

  const [movies,setMovies] = useState([]);
  const [visibleCount,setVisibleCount] = useState(MOVIES_INITIAL);
  const [movieModal,setMovieModal] = useState(null);   // this state is for... when we click on card id need to show additional information about that
  //console.log(movieModal)
  const [searchTerm,setSearchTerm] = useState("");       // this is for what where we search it should be display
  //console.log(searchTerm)
  const [sortYear,setSortYear] = useState(null)
  const [darkMode,setDarkMode] = useState(false);

  useEffect(()=>{
    setMovies(mockMovies)
  },[])
  
  // for button working
  function handleMoreMovies(){
    setVisibleCount((prev)=> prev + MOVIES_PER_LOAD)
  }

  const filteredMovies = movies.filter((movie)=>                   // this is the logic to filter the movies
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  if(sortYear === "asc"){
    filteredMovies.sort((a,b)=>a.year - b.year);
  }else if (sortYear === "desc"){
    filteredMovies.sort((a,b)=>b.year - a.year);
  }

  const displayedMovies = filteredMovies.slice(0,visibleCount);


  return (
    <div className={darkMode ? "app dark" : "app"}>
  
      {/* Header component */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortYear={sortYear} setSortYear={setSortYear} darkMode={darkMode} setDarkMode={setDarkMode}/>
      
    {/* this is for display the movies  */}
    <div className="movie-list">
      {
        displayedMovies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie} openModal = {setMovieModal}/>
        ))
      }
    </div>
      {/* this is for shore more button */}
    {
      visibleCount < movies.length && (
      <div className="load-more-container">
        <button onClick={handleMoreMovies} className='load-more-btn'>Show More</button>
      </div>
      )
    }
  {/* this is for addtional information about movie card */}
    {
      movieModal && (
        <MovieModal movie={movieModal} closeModal={()=>setMovieModal(null)}/> 
      )
    }

    
    </div>
  )
}

export default App