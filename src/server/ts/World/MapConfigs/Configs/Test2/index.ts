import { MapConfigType, MapConfigFOType } from '../../'
import { Example } from '../Example/ExampleScene'
import { Test2Scene } from './Test2Scene'

export const Test2Config: MapConfigType = {
	name: 'test2',
	mapCaller: new Test2Scene(),
	isCallback: true,
	isLaunched: true,
	characters: [],
	vehicles: [],
}

const character: MapConfigFOType = {
	objCaller: 'boxman.glb',
	type: 'character',
	subtype: null,
}

const car: MapConfigFOType = {
	// objCaller: 'car.glb',
	objCaller: new Example(),
	type: 'car',
	subtype: 'car_test',
}

Test2Config.characters.push(character)
Test2Config.vehicles.push(car)
