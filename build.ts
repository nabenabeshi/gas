import { build } from 'esbuild'
import ts from 'typescript'

const ENTRY_POINT = 'src/index.ts'

const program = ts.createProgram([ENTRY_POINT], {})
const sourceFile = program.getSourceFile(ENTRY_POINT)

const exportedFunctionNames: string[] = []
sourceFile?.forEachChild((node) => {
  if (ts.isExportDeclaration(node)) {
    node.forEachChild((node) => {
      if (ts.isNamedExports(node)) {
        node.forEachChild((node) => {
          if (ts.isExportSpecifier(node)) {
            if (ts.isIdentifier(node.name)) {
              exportedFunctionNames.push(ts.idText(node.name))
            }
          }
        })
      }
    })
  } else if (
    ts.isVariableStatement(node) &&
    includesExportKeywordModifier(node)
  ) {
    node.forEachChild((node) => {
      if (ts.isVariableDeclarationList(node)) {
        node.forEachChild((node) => {
          if (ts.isVariableDeclaration(node)) {
            node.forEachChild((node) => {
              if (ts.isIdentifier(node)) {
                exportedFunctionNames.push(ts.idText(node))
              }
            })
          }
        })
      }
    })
  } else if (
    ts.isFunctionDeclaration(node) &&
    includesExportKeywordModifier(node)
  ) {
    if (node.name) {
      const functionName = ts.idText(node.name);
      const parameters = node.parameters.map(param => {
        if (ts.isIdentifier(param.name)) {
          return ts.idText(param.name);
        }
        return param.getText();
      }).join(', ');
      exportedFunctionNames.push(`${functionName} ( ${parameters} ) `);
    }
  }
})

function includesExportKeywordModifier(node: ts.Node) {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : null
  if (!modifiers) return false

  return modifiers.some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
  )
}

const globalName = '_entry'

build({
  entryPoints: [ENTRY_POINT],
  format: 'iife',
  bundle: true,
  outdir: 'dist',
  target: 'es6',
  globalName,
  banner: {
    js: `
${exportedFunctionNames
  .map((functionName) =>
    `
function ${functionName}{
  return ${globalName}.${functionName};
};
`.trim()
  )
  .join('\n')}
`.trim(),
  },
})
