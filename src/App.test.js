import React from 'react'
import { shallow, mount, render } from 'enzyme'
import nock from 'nock'

import App from './App';
import Animes from './__mock__/Animes'

describe('App', () => {
  beforeAll(() => {
    nock('https://api.jikan.moe',{ allowUnmocked: false })
    .persist()
    .get('/v3/season/later')
    .reply(200, {
      "request_hash": "request:season:7b4caf8304de4cc9fd3443714d6f79ad16274e49",
      "request_cached": true,
      "request_cache_expiry": 86400,
      "season_name": "Later",
      "season_year": null,
      "anime": Animes
    })
  })


  it('Should match snapshot', () => {
    const component = mount(<App />);
    expect(component).toMatchSnapshot()
  });


  it('Should get itens and set on state', async () => {
    const component = mount(<App />)

    await component.instance().getData()

    expect(component.state('animes').length).toEqual(12)
  })

  it('Should navigate down', () => {
    const component = mount(<App />)

    console.log(component.state())

    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39 }))

    console.log(component.state())
    component.update()
    console.log(component.state())

    expect(component.state('activeItem')).toEqual(4)
  })

})

