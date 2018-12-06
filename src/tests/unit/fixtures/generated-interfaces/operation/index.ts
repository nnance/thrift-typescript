/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v2.0.11
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as exceptions from "./../exceptions";
export enum Operation {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4
}
export import IJankyOperation = exceptions.IInvalidOperation;
export import IJankyOperationArgs = exceptions.IInvalidOperationArgs;
export import IJankyResult = exceptions.IInvalidResult;
export import IJankyResultArgs = exceptions.IInvalidResultArgs;
export import SomethingToDo = Operation;
