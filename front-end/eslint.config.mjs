import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pkg from 'eslint-config-prettier'
const { eslintPrettier } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript'), eslintPrettier]

export default eslintConfig
