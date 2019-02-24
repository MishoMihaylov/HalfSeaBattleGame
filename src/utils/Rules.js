const BoardSize = 10;
const BoatTypes = Object.freeze({
    Carrier: "Carrier",
    Battleship: "Battleship", 
    Cruiser: "Cruiser",
    Destroyer: "Destroyer",
});
const BoatSizes = Object.freeze({
    Carrier: 5,
    Battleship: 4, 
    Cruiser: 3,
    Destroyer: 2,
});
const BoatOrientations = Object.freeze({
    Horizontal: 0,
    Vertical: 1
});
const BoatsOnBoard = Object.freeze([
    { boatType: BoatTypes.Carrier, count: 1},
    { boatType: BoatTypes.Battleship, count: 2},
    { boatType: BoatTypes.Cruiser, count: 3},
    { boatType: BoatTypes.Destroyer, count: 5}
]);
const GameState = Object.freeze({
    OnStart: 0,
    Started: 1, 
    Ended: 2
});

export { BoardSize, BoatTypes, BoatSizes, BoatOrientations, BoatsOnBoard, GameState }