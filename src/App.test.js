import React from 'react'
import { shallow, mount, render } from 'enzyme'
import nock from 'nock'

import App from './App';
import Animes from './__mock__/Animes'

describe('App', () => {
  beforeEach(() => {
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

  describe('Navigation', () => {
    it('Shouldn`t navigate up when first item was focused', async () => {
      const component = mount(<App />)
      await component.instance().getData()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }))
      component.update()

      expect(component.state('activeItem')).toEqual(0)
    })

    it('Should navigate up when focused item is in another line', async () => {
      const component = mount(<App />)
      await component.instance().getData()
      component.setState({activeItem: 7})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }))
      component.update()

      expect(component.state('activeItem')).toEqual(3)
    })

    it('Should navigate to first element when press up at first line', async () => {
      const component = mount(<App />)
      await component.instance().getData()
      component.setState({activeItem: 2})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 38 }))
      component.update()

      expect(component.state('activeItem')).toEqual(0)
    })

    it('Shouldn`t navigate down when last item was focused', async () => {
      const component = mount(<App />)
      await component.instance().getData()

     component.setState({activeItem: 11})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 }))
      component.update()

      expect(component.state('activeItem')).toEqual(11)
    })

    it('Should navigate down when focused item is in another line', async () => {
      const component = mount(<App />)
      await component.instance().getData()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 }))
      component.update()

      expect(component.state('activeItem')).toEqual(4)
    })

    it('Should navigate to last item when press down at last line', async () => {
      const component = mount(<App />)
      await component.instance().getData()
      component.setState({activeItem: 10})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 40 }))
      component.update()

      expect(component.state('activeItem')).toEqual(11)
    })

    it('Shouldn`t navigate right when last item was focused', async () => {
      const component = mount(<App />)
      await component.instance().getData()

     component.setState({activeItem: 11})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39 }))
      component.update()

      expect(component.state('activeItem')).toEqual(11)
    })

    it('Should navigate right when focused not first item has focus', async () => {
      const component = mount(<App />)
      await component.instance().getData()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 39 }))
      component.update()

      expect(component.state('activeItem')).toEqual(1)
    })

    it('Shouldn`t navigate left when first item was focused', async () => {
      const component = mount(<App />)
      await component.instance().getData()


      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37 }))
      component.update()

      expect(component.state('activeItem')).toEqual(0)
    })

    it('Should navigate left when not first item has focus', async () => {
      const component = mount(<App />)
      await component.instance().getData()
      component.setState({activeItem: 8})
      component.update()

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 37 }))
      component.update()

      expect(component.state('activeItem')).toEqual(7)
    })

  })


})

