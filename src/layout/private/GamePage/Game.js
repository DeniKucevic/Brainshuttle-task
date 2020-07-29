import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Controls from './Controls'
import './game.css'
import { joinGame, markTile, leaveSeat } from '../../../utils/API/Socket';

const Game = () => {

    const boardId = useParams().gameId
    let id = Number(window.localStorage.getItem('id'))
    let username = useParams().name

    const styleB = {
        background: 'lightblue',
        border: '2px solid darkblue',
        fontSize: '60px',
        fontWeight: '800',
        cursor: 'pointer',
        outline: 'none',
    };

    const [game, setGame] = useState({
        id: id,
        name: username,
        matrix: {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
        },
        playerTurn: true,
        opponent: '',
    })

    useEffect(() => {
        joinGame(boardId, game, setGame);
        return () => {
            leaveSeat(boardId)
        }
    // eslint-disable-next-line
    }, [boardId]);

    const isNext = () => {
        if (game.seat === 1 || game.seat === 0) {
            return (
                <h1 className='welcome-header'>You are X</h1>
            )
        } else {
            return (<h1 className='welcome-header-2'>You are O</h1>)
        }
    }


    return (
        <div className='board-wrapper'>
            {isNext()}
            <div className='board-div'>
                {Object.keys(game.matrix).map((key) => {
                    return (
                        <button key={key} style={styleB} onClick={() => {
                            if (game.playerTurn) {
                                markTile(boardId, key, setGame, game.playerTurn)
                            }
                        }}>
                            {game.matrix[key] === 0 ? (
                                " "
                            ) : game.matrix[key] === 1 ? (
                                "X"
                            ) : (
                                        "O"
                                    )}
                        </button>
                    );
                })}
            </div>
            <Controls seat={game.seat} setGame={setGame} />
        </div>
    )
}

export default Game