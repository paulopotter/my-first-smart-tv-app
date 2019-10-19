import React from 'react'
import jikanjs from 'jikanjs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animes: [],
    }
  }

  componentDidMount() {
    const animes = []
    jikanjs
      .loadSeasonLater()
      .then((response) => {
        response.anime.forEach((element) => {
          animes.push(element)
        })
        this.setState({ animes })
      }).catch((err) => {
        window.console.error(err) // in case a error happens
      })
  }

  tmpl(anime) {
    const {
      image_url, title, mal_id, type,
    } = anime

    return (
      <div id={mal_id} key={mal_id}>
        <figure>
          <span>{type}</span>
          <img src={image_url} alt={title} />
          <p>{title}</p>
        </figure>
      </div>
    )
  }

  render() {
    const { animes } = this.state
    return animes.map((anime) => this.tmpl(anime))
  }
}


export default App
