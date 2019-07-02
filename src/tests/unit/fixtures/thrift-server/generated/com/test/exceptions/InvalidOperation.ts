/* tslint:disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
export interface IInvalidOperation {
    __name: "InvalidOperation";
    whatOp?: number;
    why?: string;
}
export interface IInvalidOperationArgs {
    whatOp?: number;
    why?: string;
}
export const InvalidOperationCodec: thrift.IStructCodec<IInvalidOperationArgs, IInvalidOperation> = {
    encode(args: IInvalidOperationArgs, output: thrift.TProtocol): void {
        const obj: IInvalidOperationArgs = {
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
            __name: "InvalidOperation",
            whatOp: _args.whatOp,
            why: _args.why
        };
    }
};
export class InvalidOperation extends thrift.StructLike implements IInvalidOperation {
    public whatOp?: number;
    public why?: string;
    public readonly __name = "InvalidOperation";
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
