import io from 'socket.io-client';

const BASE_URL = 'http://178.128.206.150:7000/'

let socket = null;

const joinGame = (boardId, game, setGame) => {
    let id = Number(window.localStorage.getItem('id'))

    socket = io(`${BASE_URL}?id=${id}`)
    socket.on('connect', () => {
        socket.emit('join_room', boardId, responseCode => {
            console.log(`Ack: ${responseCode}`)
        })

    })
    socket.on('joined', responseCode => {
        if (responseCode.seat === 2 && responseCode.player.id === id) {
            setGame((prevState) => ({ ...prevState, seat: responseCode.seat, playerTurn: !prevState.playerTurn }))

        } else {
            setGame((prevState) => ({ ...prevState, seat: 1, matrix: JSON.parse(responseCode.matrix) }))
        }
        if (window.localStorage.getItem('seat') === 'null') {
            window.localStorage.setItem('seat', 1)
        } else {
            window.localStorage.setItem('seat', 2)
        }
        alert(`${responseCode.player.name} has joined the game!`)
    })
    socket.on('win', responseCode => {

        if (id === responseCode.player.id) {
            alert('You won!')
        } else {
            alert('You lost :(')
        }
        console.log(responseCode)
        socket.emit('restart', boardId, responseCode => {
            console.log(`Ack: ${responseCode}`)
        })

    })
    socket.on('tie', responseCode => {
        alert('Result is tie')
        console.log(responseCode)
        socket.emit('restart', boardId, responseCode => {
            console.log(`Ack: ${responseCode}`)
        })


    })
    socket.on('marked', responseCode => {
        if (responseCode.board_id === boardId) {
            if (responseCode.player.id === id) {
                setGame((prevState) => ({ ...prevState, matrix: responseCode.matrix, playerTurn: !prevState.playerTurn }))
                return
            } else {
                setGame((prevState) => ({ ...prevState, matrix: responseCode.matrix, playerTurn: !prevState.playerTurn }))
            }
        }
    })

    socket.on('restarted', responseCode => {
        setGame((prevState) => ({
            ...prevState, matrix: {
                "0": 0,
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0,
                "7": 0,
                "8": 0,
            }
        }))
    })


    socket.on('left', responseCode => {
        if (responseCode.board_id === boardId) {
            alert(`${responseCode.player.name} has left the game!`)
        }
    })

    socket.on('seat_left', responseCode => {
        alert(`${responseCode.player.name} has left the game!`)
    })


}

const markTile = (boardId, tilePosition) => {
    socket.emit('mark_tile', boardId, tilePosition, responseCode => {
        console.log(`Ack: ${responseCode}`)
    })

}

const restartBoard = (boardId) => {
    socket.emit('restart', boardId, responseCode => {
        console.log(`Ack: ${responseCode}`)
    })

}

const leaveGame = (boardId) => {
    socket.emit('leave_room', boardId, responseCode => {
        console.log(`Ack: ${responseCode}`)
    })

}

const leaveSeat = (boardId) => {
    let seat = window.localStorage.getItem('seat')
    socket.emit('leave_seat', boardId, seat, responseCode => {
        console.log(`Ack: ${responseCode}`)
    })
    window.localStorage.setItem('seat', null)
}


export {
    joinGame,
    markTile,
    restartBoard,
    leaveGame,
    leaveSeat
}