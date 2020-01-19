/* eslint-disable camelcase */
import React from 'react'
import jikanjs from 'jikanjs'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animes: [],
      activeItem: 0,
    }
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount() {
    const animes = []
    jikanjs
      .loadSeasonLater()
      .then(response => {
        response.anime.forEach(element => {
          animes.push(element)
        })
        this.setState({ animes })
      })
      .catch(err => {
        window.console.error(err) // in case a error happens
      })

    this.enableKeyEvent()
  }

  componentWillUnmount() {
    this.disableKeyEvent()
  }

  enableKeyEvent() {
    document.addEventListener('keydown', this.onKeyDown, true)
  }

  disableKeyEvent() {
    document.removeEventListener('keydown', this.onKeyDown, true)
  }

  onKeyDown(e) {
    const { activeItem, animes } = this.state
    console.log('->', animes.length)
    let newActiveItem = activeItem
    switch (e.keyCode) {
      case 37: // left
        if (activeItem !== 0) {
          newActiveItem -= 1
        }
        break

      case 39: // right
        if (activeItem < animes.length) {
          newActiveItem += 1
        }
        break

      case 40: // down
        if (activeItem < animes.length) {
          if (activeItem + 4 > animes.length) {
            newActiveItem = animes.length
          } else {
            newActiveItem += 4
          }
        }
        break
      case 38: // up
        if (activeItem < animes.length) {
          if (activeItem - 4 < 0) {
            newActiveItem = 0
          } else {
            newActiveItem -= 4
          }
        }
        break
      default:
        break
    }
    this.setState({
      activeItem: newActiveItem
    })
  }

  tmpl(anime, i) {
    const { image_url, title, mal_id } = anime
    const { activeItem } = this.state

    return (
      <div
        className={`poster-wrapper ${
          activeItem === i ? 'poster-wrapper--active' : null
        }`}
        id={mal_id}
        key={mal_id}
      >
        <figure>
          <img src={image_url} alt={title} />
          <p>{title}</p>
        </figure>
      </div>
    )
  }

  render() {
    const { animes } = this.state
    console.log( this.state.activeItem )
    return animes.map((anime, i) =>
      anime.type === 'TV' ? this.tmpl(anime, i) : null
    )
  }
}

export default App
