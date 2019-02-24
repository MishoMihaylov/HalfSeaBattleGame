<template>
    <div class="board"> 
        <div v-for="(boardRow, rowIndex) in board" :key="rowIndex" class="board-row">
            <div v-for="(boardCell, cellIndex) in boardRow" :key="cellIndex" 
                :class="[
                    'board-cell',
                    (boardCell.shot ? 'board-cell-shot' : 'board-cell-empty'),
                    {'board-cell-boat': showBoats && boardCell.boatRef}
                ]"
                @click="onCellClick(rowIndex, cellIndex, boardCell.name)">
            </div>
        </div>
    </div>
</template>

<script>
import BoatFactory from "../classes/BoatFactory";
import { BoardSize, BoatTypes, BoatOrientations, BoatsOnBoard } from "../utils/Rules";

export default {
    name: "BoardPanel",
    props: {
        showBoats: {
            type: Boolean,
            default: true
        }
    },
    data: function () {
        return {
            board: this.createBoard(),
            boats: {},
        }
    },
    created: function () {
        for (const boatType in BoatTypes) {
            this.boats[BoatTypes[boatType]] = [];
        }
        
        this.generateBoats();
        this.boatsStatusChanged();
    },
    methods: {
        onCellClick: function (row, column, name) {
            let currCell = this.board[row][column];

            if (currCell.name != name) throw "Cell coordinates does not match with the clicked cell name.";
            if (currCell.shot) return;
            
            let action;
            let boatSunk;
            currCell.shot = true;
            if (currCell.boatRef) {
                currCell.boatRef.isHitted();
                if (currCell.boatRef.isAlive){
                    action = "Hit!"
                } else {
                    action = `Hit! You sank my ${currCell.boatRef.name}!`;
                    boatSunk = currCell.boatRef.name;
                }

                this.boatsStatusChanged();
            }else{
                action = "Miss!";
            }

            this.$emit("boardAction", action, currCell.name, boatSunk);
        },
        createBoard: function () {
            let newBoard = [];
            let horizHeaderCharCode = 65;

            for (let i = 1; i <= BoardSize; i++) {
                let newColumn = [];

                for (let j = 1; j <= BoardSize; j++) {
                    let newCell = {};
                    newCell.name = String.fromCharCode(horizHeaderCharCode) + i;
                    newCell.shot = false;

                    horizHeaderCharCode++;
                    newColumn.push(newCell);
                }

                horizHeaderCharCode = 65;
                newBoard.push(newColumn);
            }

            return newBoard;
        },
        generateBoats: function () {
            for (let i = 0; i < BoatsOnBoard.length; i++) {
                let boatType = BoatsOnBoard[i].boatType;
                let boatTypeCount = BoatsOnBoard[i].count;
                
                for (let j = 0; j < boatTypeCount; j++) {
                    let newBoat = BoatFactory.Create(boatType);
                    let boatOrientation = Math.floor(Math.random() * 2) === 0 ? BoatOrientations.Horizontal : BoatOrientations.Vertical;
                    let isCreated = false;
                    let rowMax = boatOrientation === BoatOrientations.Horizontal ? BoardSize : BoardSize - newBoat.size;
                    let rowMin = boatOrientation === BoatOrientations.Horizontal ? BoardSize - newBoat.size : BoardSize;
                    let row;
                    let column;

                    while(!isCreated) {
                        row = Math.floor(Math.random() * (rowMax));
                        column = Math.floor(Math.random() * (rowMin));
                        isCreated = true;

                        for (let k = 0; k < newBoat.size; k++) {
                            let boardCell = boatOrientation === BoatOrientations.Horizontal ? this.board[row][column + k] : this.board[row + k][column];
                                        
                            if (boardCell.boatRef != undefined) {
                                isCreated = false;
                                break;
                            }
                        }

                        if (isCreated) {
                            for (let k = 0; k < newBoat.size; k++) {
                                let boardCell = boatOrientation === BoatOrientations.Horizontal ? this.board[row][column + k] : this.board[row + k][column];
                                
                                boardCell.boatRef = newBoat
                            }

                            this.boats[newBoat.name].push(newBoat);
                        }
                    }
                }
            }
        },
        boatsStatusChanged: function () {
            let currBoatsStatus = [];
            let allDestroyed = true;

            for (const boatType in this.boats) {
                let boatsAlive = 0;
                this.boats[boatType].forEach(boat => {
                    if (boat.isAlive) boatsAlive++;
                });

                currBoatsStatus.push(boatType + ": " + boatsAlive);
                if (boatsAlive > 0) allDestroyed = false;
            }

            this.$emit("boatsStatusChanged", currBoatsStatus, allDestroyed);
        }
    }
};
</script>

<style lang="scss">
.board-cell {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
    cursor: pointer;
    border: 1px solid brown;
    display: inline-block;
    width: 35px;
    height: 35px;
}
.board-row {
    height: 37px;
}
.board-cell {
    background-color: #c1946a;
}
.board-cell-shot{
    background-image: url("../assets/shot.png");
    background-repeat: no-repeat;
    background-position: center;
}
.board-cell-empty:hover{
    background-image: url("../assets/target.png");
    background-repeat: no-repeat;
    background-position: center;
}
.board-cell-boat {
    background-color: black;
}
</style>
