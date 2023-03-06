import Profiles from "../../components/Profiles/Profiles";
import Search from "../../components/Search/Search";

const Home = () => {
  return (
    <main>
      <Search />
      <h2 className="title">Perfis criados recentemente no Devs Brasil</h2>
      <Profiles />
    </main>
  )
}

export default Home;