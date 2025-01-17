import EventEmitter from "eventemitter3"

export enum EInternalEvents {
   UPDATE_DRAGGABLE_LISTS_WIDTH = "UPDATE_DRAGGABLE_LISTS_WIDTH",
}

export const eventEmitter = new EventEmitter()
