import { useState } from 'react';
import './App.css'
import CarShow from './CarShow';
import { Controls } from './components/controls';
import UserStore from './components/stores/UserStore';
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: 'Lambo',
  items: {
    Lambo: UserStore.colors.split(',')[0],
    Lambo_old: UserStore.colors.split(',')[1],
    Porsche: UserStore.colors.split(',')[2],
    Porsche_old: UserStore.colors.split(',')[3],
    Bmw: UserStore.colors.split(',')[4],
    Bmw_old: UserStore.colors.split(',')[5],
    Mercedes: UserStore.colors.split(',')[6],
    Mercedes_old: UserStore.colors.split(',')[7],
  },
})

function App(props) {
  const [count, set] = useState(0)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const [start, setStart] = useState(false)
  const [old, setOld] = useState(false);

  const setCount = (amount) => {
    // if (!start) {
    //   setStart(true);
    //   setTimeout(function () {
    //     if (start === false) {
    //       if (amount === + 1) set(p => (p + 1) % 4)
    //       if (amount === - 1 && count !== 0) set(p => (p - 1) % 4)
    //       if (amount === - 1 && count === 0) set(3)
    //     }
    //   }, 800);
    // }
  }

  const handelInput = (event) => {
    if (event.deltaY > 0 && scrollEnabled) {
      setScrollEnabled(false)
      setTimeout(function () {
        setScrollEnabled(true)
      }, 1000)
      // setCount(+ 1)
    }
    if (event.deltaY < 0 && scrollEnabled) {
      setScrollEnabled(false)
      setTimeout(function () {
        setScrollEnabled(true)
      }, 1000)
      // setCount(- 1)
    }
  }

  return (
    <div className="App">
      <CarShow count={count} start={start} setStart={(b) => setStart(b)} onWheel={(e) => handelInput(e)} old={old} state={state}/>
      <header>
        <ul className='old' onClick={() => setOld(true)}>
          Old
        </ul>
        <ul className='new' onClick={() => setOld(false)}>
          New
        </ul>
      </header>
      <a className='madeby' href='https://github.com/Tillwad' target='_blank'>Made by Till Wadehn!</a>
      {/* <div className='prev' onClick={() => { setCount(- 1) }}><p className='next-text'>&lt;</p></div> */}
      {/* <div className='next' onClick={() => { setCount(+ 1) }}><p className='next-text'>&gt;</p></div> */}
      {props.login && count !== 2 ? <Controls state={state}/> : null}
      {props.login && count === 2 && old ? <Controls state={state}/> : null}
    </div>
  );
}

export default App;
