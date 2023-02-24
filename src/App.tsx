import './App.css';
import useGithubLikeManagement from './hooks/useGithubLikeManagement';
import useGithubRepositories from './hooks/useGithubRepositories/useGithubRepositories';



function App() {
  const { repos, isLoding, error, refetch } = useGithubRepositories({ org: 'google' })
  const { repositoryLiked, toggleLike } = useGithubLikeManagement()


  return (
    <div className="App">
      {isLoding && <div>..Carregando</div>}
      {error && (<div>
        <p>Erro ao Carregar os dados</p>
        <button onClick={() => refetch}>Tentar novamente</button>
      </div>)
      }
      {
        repos.map((repo) => {
          const isLiked = repositoryLiked.find(r => r.id === repo.id)
          return <div key={repo.id} >
            <h2>{repo.full_name}
              <span>by {repo.owner.login}</span>
            </h2>
            <button onClick={() => toggleLike(repo.id)} >{
              isLiked ? "Descutir" : "Curti"}
            </button>
          </div>
        })
      }
    </div>
  );
}

export default App;
