#!/bin/bash

rm -fr dist/cjs
rm -fr dist/esm
tsc -p tsconfig.cjs.json
tsc -p tsconfig.esm.json

cp README.md ./dist

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/esm/package.json <<!EOF
{
    "type": "module"
}
!EOF