import React from 'react';
import boardimg from '../../../assets/boardimg.png'
import { useHistory, useParams } from 'react-router-dom';
import './fields.css'

const Boards = ({ boards, loading, indexOfFirstBoard }) => {

    const history = useHistory()

    let username = useParams().name
    let id = Number(window.localStorage.getItem('id'))

    if (loading) {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>);
    }

    let number = indexOfFirstBoard
    const roomNumber = () => {
        return (
            number = number + 1
        )
    }

    return (
        <div className='fields'>
            {boards.map((el) => (
                <div className='grid-container' key={el.id}>
                    <div className='room-number'><span>Room number: {roomNumber()}</span></div>
                    <div className="image"><span><img src={boardimg} alt='#' style={{ maxWidth: '60%' }} /></span></div>
                    <div className="button">
                        <button className='join-button' onClick={() => history.push(`/${id}/${username}/${el.id}`)} >GO!</button>
                        <div className="players"><p>players: {el.players}</p></div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Boards;