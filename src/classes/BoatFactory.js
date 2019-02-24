import Boat from "./Boat"
import { BoatTypes, BoatSizes } from "../utils/Rules";

export default class BoatFactory {
    static Create (boatType) {
        switch(boatType) {
            case (BoatTypes.Carrier):
                return new Boat(BoatTypes.Carrier, BoatSizes.Carrier);
            case (BoatTypes.Battleship):
                return new Boat(BoatTypes.Battleship, BoatSizes.Battleship);
            case (BoatTypes.Cruiser):
                return new Boat(BoatTypes.Cruiser, BoatSizes.Cruiser);
            case (BoatTypes.Destroyer):
                return new Boat(BoatTypes.Destroyer, BoatSizes.Destroyer);
            default: throw "Error on creating unknown boat type. Come on man that is not RPG."
        }
    }
}