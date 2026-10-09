import { Link } from 'react-router-dom'

export default function Placeholder({ title }) {
  return (
    <main className="container section">
      <h1>{title}</h1>
      <p>This page is coming in a later step.</p>
      <Link to="/">Back to Home</Link>
    </main>
  )
}
