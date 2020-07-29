import React, { useState, useEffect } from 'react'
import { player } from '../../../utils/API/ApiEndpoints';
import { useHistory } from 'react-router-dom';
import './Input.css';

const CreatePlayerPage = () => {

    let history = useHistory()

    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    let id
    let name

    useEffect(() => {
        // eslint-disable-next-line
        id = Number(window.localStorage.getItem('id'))
        // eslint-disable-next-line
       name = window.localStorage.getItem('name')
        if (name != null) {
            history.push(`/${id}/${name}`)
        }
    }, [input])

    const handleClick = () => {
        id = Number(window.localStorage.getItem('id'))
        name = window.localStorage.getItem('name')
        if (input === '') {
            window.alert('Please enter a username')
        } else {
            player(input).then(res => {
                if (res.status === 200) {
                    let id = res.data.id
                    window.localStorage.setItem('id', id)
                    window.localStorage.setItem('name', input)
                    window.localStorage.setItem('seat', null)
                    history.push(`/${res.data.id}/${res.data.name}`)
                    console.log(res)
                } else {
                    console.log(res);
                    console.warn('hmmm, something went wrong...')
                }

            })
        }
    }


    return (
        <div className='wrapper'>
            <p className='rainbow'>TIC-TAC-TOE</p>
            <p className='welcome'>WELCOME ! ! !</p>
            <p className='glow'>Please create profile :</p>
            <div className='container'>
                <input className='css-input' onChange={(e) => handleInput(e)}></input>
                <button onClick={() => handleClick()} className="button4 bouncy" style={{ backgroundColor: '#f07f01' }}>START!</button>
            </div>
        </div>
    )
}

export default CreatePlayerPage;