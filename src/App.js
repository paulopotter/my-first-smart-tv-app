/* eslint-disable camelcase */
import React from 'react'
import jikanjs from 'jikanjs'

import './App.css'

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
      })
      .catch((err) => {
        window.console.error(err) // in case a error happens
      })
  }

  tmpl(anime) {
    const {
      image_url, title, mal_id
    } = anime

    return (
      <div className="poster-wrapper" id={mal_id} key={mal_id}>
        <figure>
          <img src={image_url} alt={title} />
          <p>{title}</p>
        </figure>
      </div>
    )
  }

  render() {
    const { animes } = this.state
    return animes.map((anime) => anime.type == 'TV' ? this.tmpl(anime) : null)
  }
}

export default App
