import { useEffect, useState } from 'react'
import './App.css'

type PostCollection = PostSummary[]

type PostSummary = {
  id: string,
  displayName: string,
  starred: boolean
}

function App() {
  const [posts, setPosts] = useState([] as PostCollection)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json')
        const data = await response.json()
        setPosts(data.dashboards)
        setError(false)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>There was an error</h1>
      ) : (
        <div>
          {posts.map((post: PostSummary) => (
            <div key={post.id}>
              <h1>{post.displayName}</h1>
              <p>{post.starred ? 'Starred' : 'Not starred'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
