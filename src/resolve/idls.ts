import {
  addSyntheticLeadingComment,
  createModuleBlock,
  createModuleDeclaration,

  NodeFlags,
  SyntaxKind,

  ModuleDeclaration
} from 'typescript';

import { NamespaceNode, resolveNamespace } from './namespace';
import { ConstNode, resolveConsts } from './consts';
import { TypedefNode, resolveTypedefs } from './typedefs';
import { InterfaceNode, resolveInterfaces } from './interfaces';
import { StructNode, resolveStructs } from './structs';
import { ExceptionNode, resolveExceptions } from './exceptions';

import { tokens } from '../ast/tokens';

export class IDLNode {
  public filename: string;
  public namespace: NamespaceNode;
  public typedefs: TypedefNode[];
  public consts: ConstNode[];
  public interfaces: InterfaceNode[];
  public structs: StructNode[];
  public exceptions: ExceptionNode[];

  constructor(idl) {
    this.filename = idl.filename;
    // TODO: are the `resolve` methods better served in the constructor or resolveIDLs?
    this.namespace = resolveNamespace(idl);
    this.typedefs = resolveTypedefs(idl);
    this.consts = resolveConsts(idl);
    this.interfaces = resolveInterfaces(idl);
    this.structs = resolveStructs(idl);
    this.exceptions = resolveExceptions(idl);
  }

  public toAST(): ModuleDeclaration {
    const namespace = this.namespace.toAST();
    const types = this.typedefs.map((typedef) => typedef.toAST());
    const constants = this.consts.map((constant) => constant.toAST());
    const interfaces = this.interfaces.map((iface) => iface.toAST());
    const structs = this.structs.map((struct) => struct.toAST());
    const exceptions = this.exceptions.map((exception) => exception.toAST());

    let namespaceBlock = createModuleBlock([
      ...types,
      ...interfaces,
      ...structs,
      ...exceptions,
      ...constants
    ]);

    let moduleDec = createModuleDeclaration(undefined, [tokens.export], namespace, namespaceBlock, NodeFlags.Namespace);

    moduleDec = addSyntheticLeadingComment(moduleDec, SyntaxKind.SingleLineCommentTrivia, ` Generated by ${this.filename}`, false);

    return moduleDec;
  }
}

export function resolveIDLs(idls: any[]) {
  return idls.map((idl) => new IDLNode(idl))
}