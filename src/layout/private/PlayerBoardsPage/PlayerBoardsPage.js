import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { createBoard, getBoards } from '../../../utils/API/ApiEndpoints';
import './fields.css'
import Boards from './Boards';
import Pagination from './Pagination';

const PlayerBoardsPage = () => {

    const [boards, setBoards] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [boardsPerPage] = useState(6);

    let username = useParams().name

    const history = useHistory()

    useEffect(() => {
        const fetchBoards = async () => {
            setLoading(true);
            await getBoards().then(res => {
                setBoards(res.data);
            });
            setLoading(false);
        }
        fetchBoards()
    }, [])

    // Get current boards
    const indexOfLastBoard = currentPage * boardsPerPage;
    const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;
    const currentBoard = boards.slice(indexOfFirstBoard, indexOfLastBoard);


    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const handleClick = () => {
        createBoard().then(res => setBoards([...boards, { id: res.data.id, players: 0 }]))
    }

    return (
        <div className='player-boards-wrapper'>
            <h1 style={{ marginTop: '0' }} className='welcome-header'>WELCOME {username}</h1>
            <button className='create-board' onClick={() => handleClick()}>CREATE BOARD</button>
            <button className='create-board' onClick={() => {
                localStorage.removeItem("id");
                localStorage.removeItem("name");
                history.push('/')
            }}>Logout</button>
            <Boards boards={currentBoard} loading={loading} indexOfFirstBoard={indexOfFirstBoard} />
            <Pagination
                boardsPerPage={boardsPerPage}
                totalBoards={boards.length}
                paginate={paginate}
            />
        </div>
    )
}

export default PlayerBoardsPage;