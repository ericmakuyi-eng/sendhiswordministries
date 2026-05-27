import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <div className="hero">
      <video className="bgvideo" autoPlay muted loop playsInline>
        <source src="/homepage-highlight.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="content">
        <h1>Send His Word Ministries</h1>
        <p>Healing Lives • Raising Disciples • Reaching Nations</p>

        <div className="buttons">
          <button>Watch Sermons</button>
          <button>Request Prayer</button>
          <button>Give Online</button>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
