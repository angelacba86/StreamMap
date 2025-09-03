import { Banner, StepsCards, MoviesCategory } from "../components";
function Home() {
  return (
    <>
      <Banner />
      <StepsCards />
      <MoviesCategory
        type="movie"
        category="popular"
        title="🎬 Películas Populares"
      />
      <MoviesCategory
        type="tv"
        category="popular"
        title="📺 Series Populares"
      />
    </>
  );
}
export default Home;
