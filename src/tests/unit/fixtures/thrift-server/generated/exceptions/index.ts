/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.1.1
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
import * as shared from "./../shared";
export interface IInvalidOperation {
    whatOp?: number;
    why?: string;
}
export interface IInvalidOperationArgs {
    whatOp?: number;
    why?: string;
}
export const InvalidOperationCodec: thrift.IStructCodec<IInvalidOperationArgs, IInvalidOperation> = {
    encode(args: IInvalidOperationArgs, output: thrift.TProtocol): void {
        const obj = {
            whatOp: args.whatOp,
            why: args.why
        };
        output.writeStructBegin("InvalidOperation");
        if (obj.whatOp != null) {
            output.writeFieldBegin("whatOp", thrift.TType.I32, 1);
            output.writeI32(obj.whatOp);
            output.writeFieldEnd();
        }
        if (obj.why != null) {
            output.writeFieldBegin("why", thrift.TType.STRING, 2);
            output.writeString(obj.why);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IInvalidOperation {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.I32) {
                        const value_1: number = input.readI32();
                        _args.whatOp = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        const value_2: string = input.readString();
                        _args.why = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            whatOp: _args.whatOp,
            why: _args.why
        };
    }
};
export class InvalidOperation extends thrift.StructLike implements IInvalidOperation {
    public whatOp?: number;
    public why?: string;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IInvalidOperationArgs = {}) {
        super();
        if (args.whatOp != null) {
            const value_3: number = args.whatOp;
            this.whatOp = value_3;
        }
        if (args.why != null) {
            const value_4: string = args.why;
            this.why = value_4;
        }
    }
    public static read(input: thrift.TProtocol): InvalidOperation {
        return new InvalidOperation(InvalidOperationCodec.decode(input));
    }
    public static write(args: IInvalidOperationArgs, output: thrift.TProtocol): void {
        return InvalidOperationCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return InvalidOperationCodec.encode(this, output);
    }
}
export interface IInvalidResult {
    message?: string;
    code?: shared.ICode;
}
export interface IInvalidResultArgs {
    message?: string;
    code?: shared.ICodeArgs;
}
export const InvalidResultCodec: thrift.IStructCodec<IInvalidResultArgs, IInvalidResult> = {
    encode(args: IInvalidResultArgs, output: thrift.TProtocol): void {
        const obj = {
            message: args.message,
            code: args.code
        };
        output.writeStructBegin("InvalidResult");
        if (obj.message != null) {
            output.writeFieldBegin("message", thrift.TType.STRING, 1);
            output.writeString(obj.message);
            output.writeFieldEnd();
        }
        if (obj.code != null) {
            output.writeFieldBegin("code", thrift.TType.STRUCT, 2);
            shared.CodeCodec.encode(obj.code, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IInvalidResult {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.STRING) {
                        const value_5: string = input.readString();
                        _args.message = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_6: shared.ICode = shared.CodeCodec.decode(input);
                        _args.code = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            message: _args.message,
            code: _args.code
        };
    }
};
export class InvalidResult extends thrift.StructLike implements IInvalidResult {
    public message?: string;
    public code?: shared.ICode;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IInvalidResultArgs = {}) {
        super();
        if (args.message != null) {
            const value_7: string = args.message;
            this.message = value_7;
        }
        if (args.code != null) {
            const value_8: shared.ICode = new shared.Code(args.code);
            this.code = value_8;
        }
    }
    public static read(input: thrift.TProtocol): InvalidResult {
        return new InvalidResult(InvalidResultCodec.decode(input));
    }
    public static write(args: IInvalidResultArgs, output: thrift.TProtocol): void {
        return InvalidResultCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return InvalidResultCodec.encode(this, output);
    }
}
