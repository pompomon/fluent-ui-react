import * as Stardust from '@stardust-ui/react'

import { KnobDefinition, KnobGeneratorOptions, KnobGenerator } from 'docs/src/types'
import * as componentGenerators from './componentGenerators'
import * as propGenerators from './propGenerators'
import * as typeGenerators from './typeGenerators'
import * as _ from 'lodash'

const propsBlacklist: (string | RegExp)[] = [
  'accessibility', // TODO: generate accessibility
  'animation', // TODO: generate animations

  'as', // we don't want to expose `as` in playground
  'keyframeParams', // on Animation component

  // default* & render* props are not supported
  /^default.+/,
  /^render.+/,

  // Any styles props can't be supported in obvious way
  'className',
  'styles',
  'variables',
]

const isBlacklistedProp = (propName: string): boolean =>
  propsBlacklist.some(blacklistedProp => {
    if (typeof blacklistedProp === 'string' && blacklistedProp === propName) {
      return true
    }

    return !!propName.match(blacklistedProp)
  })

const createHookGenerator = (options: KnobGeneratorOptions): null | KnobDefinition => {
  const { componentInfo, propDef } = options

  // TODO: add support for AutoControlled props
  const Component = Stardust[componentInfo.displayName]

  if (process.env.NODE_ENV !== 'production') {
    if (!Component) {
      throw new Error(
        `Cannot find an export for "${componentInfo.displayName}", please check that it is exported from "@stardust-ui/react"`,
      )
    }
  }

  const { autoControlledProps = [] } = Component

  if (autoControlledProps.indexOf(propDef.name) !== -1) {
    return null
  }

  const propGenerator: KnobGenerator<any> = _.get(
    componentGenerators,
    [componentInfo.displayName, propDef.name],
    propGenerators[propDef.name],
  )

  if (propGenerator) {
    return propGenerator(options)
  }

  if (isBlacklistedProp(propDef.name)) {
    return null
  }

  if (propDef.types.length === 1) {
    const typeName = propDef.types[0].name
    const typeGenerator: KnobGenerator<any> = typeGenerators[typeName]

    if (typeGenerator) {
      return typeGenerator(options)
    }
  }

  const isAlphaNumType = propDef.types.every(type => {
    return type.name === 'string' || type.name === 'number'
  })

  if (isAlphaNumType) {
    return typeGenerators.string(options)
  }

  const isLiteralType = propDef.types.some(type => {
    return type.name === 'literal'
  })

  if (isLiteralType) {
    return typeGenerators.literal(options)
  }

  return null
}

export default createHookGenerator
