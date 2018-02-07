import * as ts from 'typescript'

import {
    ConstDefinition,
    TypedefDefinition,
    EnumDefinition,
    StructDefinition,
    ServiceDefinition,
    ExceptionDefinition,
    UnionDefinition,
} from '@creditkarma/thrift-parser'

import { renderException as _renderException } from './exception'

import {
    renderArgsStruct,
    renderClient,
    renderProcessor,
    renderResultStruct,
} from './service'

import {
    renderHandlerInterface,
} from '../shared/service'

import { renderStruct as _renderStruct } from './struct'
import { renderUnion as _renderUnion } from './union'
import { renderEnum as _renderEnum } from '../shared/enum'
import { renderTypeDef as _renderTypeDef } from '../shared/typedef'
import { renderConst as _renderConst } from '../shared/const'
import { fileUsesThrift } from '../shared/includes'
import {
    renderIncludes as _renderIncludes,
    renderThriftImports,
} from './includes'

import {
    IIdentifierMap,
    IRenderer,
    IRenderedFileMap,
    IResolvedFile,
} from '../../types'

import { typeNodeForFieldType } from './types';

export function renderIncludes(
    outPath: string,
    includes: IRenderedFileMap,
    resolvedFile: IResolvedFile,
): Array<ts.Statement> {
    if (fileUsesThrift(resolvedFile)) {
        return [
            renderThriftImports(),
            ..._renderIncludes(outPath, includes, resolvedFile),
        ]
    } else {
        return _renderIncludes(outPath, includes, resolvedFile)
    }
}

export function renderConst(statement: ConstDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [ _renderConst(statement, typeNodeForFieldType) ]
}

export function renderTypeDef(statement: TypedefDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderTypeDef(statement, typeNodeForFieldType, identifiers)
}

export function renderEnum(statement: EnumDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [ _renderEnum(statement) ]
}

export function renderStruct(statement: StructDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderStruct(statement, identifiers)
}

export function renderException(statement: ExceptionDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderException(statement, identifiers)
}

export function renderUnion(statement: UnionDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return _renderUnion(statement, identifiers)
}

export function renderService(statement: ServiceDefinition, identifiers: IIdentifierMap): Array<ts.Statement> {
    return [
        ts.createModuleDeclaration(
            undefined,
            [ ts.createToken(ts.SyntaxKind.ExportKeyword) ],
            ts.createIdentifier(statement.name.value),
            ts.createModuleBlock([
                ...renderArgsStruct(statement, identifiers),
                ...renderResultStruct(statement, identifiers),
                renderClient(statement),
                ...renderHandlerInterface(statement, typeNodeForFieldType),
                renderProcessor(statement, identifiers),
            ]),
            ts.NodeFlags.Namespace
        )
    ]
}

export const renderer: IRenderer = {
    renderIncludes,
    renderConst,
    renderTypeDef,
    renderEnum,
    renderStruct,
    renderException,
    renderUnion,
    renderService,
}
