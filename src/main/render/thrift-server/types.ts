import * as ts from 'typescript'

import {
  FunctionType,
  SyntaxType,
} from '@creditkarma/thrift-parser'

import {
  IIdentifierMap,
  IResolvedIdentifier
} from '../../types'

import {
  COMMON_IDENTIFIERS,
  THRIFT_TYPES,
  PROTOCOL_EXCEPTION,
  APPLICATION_EXCEPTION,
} from './identifiers'

export function createVoidType(): ts.TypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
}

export function createAnyType(): ts.TypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
}

export function createStringType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
}

export function createNumberType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
}

export function createBooleanType(): ts.KeywordTypeNode {
  return ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
}

export function createTypeProperty(name: string, type: ts.TypeNode): ts.PropertySignature {
  return ts.createPropertySignature(
    undefined, // modifiers
    name, // name of property
    undefined, // question token if optional
    type, // type of property
    undefined, // initializer value
  )
}

/**
 * Creates type annotations for Thrift types
 *
 * EXAMPLE
 *
 * // thrift
 * const bool FALSE_CONST = false
 *
 * // typescript
 * const FALSE_CONST: boolean = false
 *
 * This function provides the ': boolean' bit.
 *
 * Container types:
 *
 * SetType | MapType | ListType
 *
 * Base types:
 *
 * SyntaxType.StringKeyword | SyntaxType.DoubleKeyword | SyntaxType.BoolKeyword |
 * SyntaxType.I8Keyword | SyntaxType.I16Keyword | SyntaxType.I32Keyword |
 * SyntaxType.I64Keyword | SyntaxType.BinaryKeyword | SyntaxType.ByteKeyword;
 *
 * Function types:
 *
 * SyntaxType.VoidKeyword
 */
export function typeNodeForFieldType(fieldType: FunctionType): ts.TypeNode {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return ts.createTypeReferenceNode(fieldType.value, undefined)

    case SyntaxType.SetType:
      return ts.createTypeReferenceNode(
        'Set',
        [ typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.MapType:
      return ts.createTypeReferenceNode(
        'Map',
        [ typeNodeForFieldType(fieldType.keyType), typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.ListType:
      return ts.createTypeReferenceNode(
        'Array',
        [ typeNodeForFieldType(fieldType.valueType) ],
      )

    case SyntaxType.StringKeyword:
      return createStringType()

    case SyntaxType.BoolKeyword:
      return createBooleanType()

    case SyntaxType.I64Keyword:
      return ts.createTypeReferenceNode(COMMON_IDENTIFIERS.Int64, undefined)

    case SyntaxType.BinaryKeyword:
      return ts.createTypeReferenceNode('Buffer', undefined)

    case SyntaxType.DoubleKeyword:
    case SyntaxType.I8Keyword:
    case SyntaxType.I16Keyword:
    case SyntaxType.I32Keyword:
    case SyntaxType.ByteKeyword:
      return createNumberType()

    case SyntaxType.VoidKeyword:
      return createVoidType()

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

export function constructorNameForFieldType(fieldType: FunctionType): ts.Identifier {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return ts.createIdentifier(fieldType.value)

    case SyntaxType.SetType:
      return COMMON_IDENTIFIERS.Set

    case SyntaxType.MapType:
      return COMMON_IDENTIFIERS.Map

    case SyntaxType.ListType:
      return COMMON_IDENTIFIERS.Array

    case SyntaxType.StringKeyword:
      return COMMON_IDENTIFIERS.String

    case SyntaxType.BoolKeyword:
      return COMMON_IDENTIFIERS.Boolean

    case SyntaxType.I64Keyword:
      return COMMON_IDENTIFIERS.Int64

    case SyntaxType.BinaryKeyword:
      return COMMON_IDENTIFIERS.Buffer

    case SyntaxType.DoubleKeyword:
    case SyntaxType.I8Keyword:
    case SyntaxType.I16Keyword:
    case SyntaxType.I32Keyword:
    case SyntaxType.ByteKeyword:
      return COMMON_IDENTIFIERS.Number

    case SyntaxType.VoidKeyword:
      return COMMON_IDENTIFIERS.void

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

export type TProtocolException =
  'UNKNOWN' | 'INVALID_DATA' | 'NEGATIVE_SIZE' |
  'SIZE_LIMIT' | 'BAD_VERSION' | 'NOT_IMPLEMENTED' |
  'DEPTH_LIMIT'

export type TApplicationException =
  'UNKNOWN' | 'UNKNOWN_METHOD' | 'INVALID_MESSAGE_TYPE' |
  'WRONG_METHOD_NAME' | 'BAD_SEQUENCE_ID' | 'MISSING_RESULT' |
  'INTERNAL_ERROR' | 'PROTOCOL_ERROR' | 'INVALID_TRANSFORM' |
  'INVALID_PROTOCOL' | 'UNSUPPORTED_CLIENT_TYPE'

export function protocolException(exceptionType: TProtocolException): ts.Identifier {
  switch (exceptionType) {
    case 'UNKNOWN':
      return PROTOCOL_EXCEPTION.UNKNOWN
    case 'INVALID_DATA':
      return PROTOCOL_EXCEPTION.INVALID_DATA
    case 'NEGATIVE_SIZE':
      return PROTOCOL_EXCEPTION.NEGATIVE_SIZE
    case 'SIZE_LIMIT':
      return PROTOCOL_EXCEPTION.SIZE_LIMIT
    case 'BAD_VERSION':
      return PROTOCOL_EXCEPTION.BAD_VERSION
    case 'NOT_IMPLEMENTED':
      return PROTOCOL_EXCEPTION.NOT_IMPLEMENTED
    case 'DEPTH_LIMIT':
      return PROTOCOL_EXCEPTION.DEPTH_LIMIT
    default:
      const msg: never = exceptionType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

export function applicationException(exceptionType: TApplicationException): ts.Identifier {
  switch (exceptionType) {
    case 'UNKNOWN':
      return APPLICATION_EXCEPTION.UNKNOWN
    case 'UNKNOWN_METHOD':
      return APPLICATION_EXCEPTION.UNKNOWN_METHOD
    case 'INVALID_MESSAGE_TYPE':
      return APPLICATION_EXCEPTION.INVALID_MESSAGE_TYPE
    case 'WRONG_METHOD_NAME':
      return APPLICATION_EXCEPTION.WRONG_METHOD_NAME
    case 'BAD_SEQUENCE_ID':
      return APPLICATION_EXCEPTION.BAD_SEQUENCE_ID
    case 'MISSING_RESULT':
      return APPLICATION_EXCEPTION.MISSING_RESULT
    case 'INTERNAL_ERROR':
      return APPLICATION_EXCEPTION.INTERNAL_ERROR
    case 'PROTOCOL_ERROR':
      return APPLICATION_EXCEPTION.PROTOCOL_ERROR
    case 'INVALID_TRANSFORM':
      return APPLICATION_EXCEPTION.INVALID_TRANSFORM
    case 'INVALID_PROTOCOL':
      return APPLICATION_EXCEPTION.INVALID_PROTOCOL
    case 'UNSUPPORTED_CLIENT_TYPE':
      return APPLICATION_EXCEPTION.UNSUPPORTED_CLIENT_TYPE
    default:
      const msg: never = exceptionType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

function thriftTypeForIdentifier(id: IResolvedIdentifier, identifiers: IIdentifierMap): ts.Identifier {
  switch (id.definition.type) {
    case SyntaxType.ConstDefinition:
      throw new TypeError(`Identifier ${id.definition.name.value} is a value being used as a type`)

    case SyntaxType.ServiceDefinition:
      throw new TypeError(`Service ${id.definition.name.value} is being used as a type`)

    case SyntaxType.StructDefinition:
    case SyntaxType.UnionDefinition:
    case SyntaxType.ExceptionDefinition:
      return THRIFT_TYPES.STRUCT

    case SyntaxType.EnumDefinition:
      return THRIFT_TYPES.I32

    case SyntaxType.TypedefDefinition:
      return thriftTypeForFieldType(
        id.definition.definitionType,
        identifiers
      )

    default:
      const msg: never = id.definition
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}

/**
 * Gets the type access for the 'Thrift' object for a given FieldType.
 *
 * This could and should probably be a map of FieldType -> ThriftAccess.
 * However, using a switch statement gives us the safety of exhaustive matching
 * for FieldTypes.
 *
 * @todo Clean up so that we can use the strictNullChecks compiler flag which
 * would allow us to use a map and get the same safety as the switch.
 *
 * @param fieldType
 */
export function thriftTypeForFieldType(fieldType: FunctionType, identifiers: IIdentifierMap): ts.Identifier {
  switch (fieldType.type) {
    case SyntaxType.Identifier:
      return thriftTypeForIdentifier(
        identifiers[fieldType.value],
        identifiers
      )

    case SyntaxType.SetType:
      return THRIFT_TYPES.SET

    case SyntaxType.MapType:
      return THRIFT_TYPES.MAP

    case SyntaxType.ListType:
      return THRIFT_TYPES.LIST

    case SyntaxType.BinaryKeyword:
    case SyntaxType.StringKeyword:
      return THRIFT_TYPES.STRING

    case SyntaxType.BoolKeyword:
      return THRIFT_TYPES.BOOL

    case SyntaxType.DoubleKeyword:
      return THRIFT_TYPES.DOUBLE

    case SyntaxType.I8Keyword:
    case SyntaxType.ByteKeyword:
      return THRIFT_TYPES.BYTE

    case SyntaxType.I16Keyword:
      return THRIFT_TYPES.I16

    case SyntaxType.I32Keyword:
      return THRIFT_TYPES.I32

    case SyntaxType.I64Keyword:
      return THRIFT_TYPES.I64

    case SyntaxType.VoidKeyword:
      return THRIFT_TYPES.VOID

    default:
      const msg: never = fieldType
      throw new Error(`Non-exhaustive match for: ${msg}`)
  }
}