import React from 'react'
import { useParams} from 'react-router-dom'
import { restartBoard, leaveSeat } from '../../../utils/API/Socket'

const Controls = ({ seat, setGame }) => {

    const gameId = useParams().gameId

    return (
        <div>
            <button className='create-board button-margin' onClick={() => { leaveSeat(gameId); window.history.back(); }}>Leave room</button>
            <button className='create-board button-margin' onClick={() => restartBoard(gameId, setGame)}>restart</button>
        </div>
    )
}

export default Controls