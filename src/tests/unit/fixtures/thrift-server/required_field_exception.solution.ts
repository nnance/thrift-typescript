export class MyException extends Error {
    public message: string;
    public code?: number;
    constructor(args: {
        message: string;
        code?: number;
    }) {
        super();
        if (args != null && args.message != null) {
            this.message = args.message;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[message] is unset!");
        }
        if (args != null && args.code != null) {
            this.code = args.code;
        }
    }
}
export const MyExceptionCodec: thrift.IStructCodec<MyException> = {
    encode(val: MyException, output: thrift.TProtocol): void {
        const obj = {
            message: val.message,
            code: val.code
        };
        output.writeStructBegin("MyException");
        if (obj.message != null) {
            output.writeFieldBegin("message", thrift.TType.STRING, 1);
            output.writeString(obj.message);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[message] is unset!");
        }
        if (obj.code != null) {
            output.writeFieldBegin("code", thrift.TType.I32, 2);
            output.writeI32(obj.code);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): MyException {
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
                        const value_1: string = input.readString();
                        _args.message = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.I32) {
                        const value_2: number = input.readI32();
                        _args.code = value_2;
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
        if (_args.message !== undefined) {
            return new MyException({
                message: _args.message,
                code: _args.code
            });
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read MyException from input");
        }
    }
};
