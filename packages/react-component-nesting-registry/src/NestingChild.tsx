import * as React from 'react'

import NestingContext from './NestingContext'
import { NestingContextValue, NestingProps, NodeRef } from './types'

type NestingChildInnerProps = NestingContextValue & NestingProps

class NestingChildInner<T extends Node> extends React.Component<NestingChildInnerProps> {
  childRef = React.createRef<T>()

  componentDidMount() {
    this.props.register(this.childRef)
  }

  componentWillUnmount() {
    this.props.unregister(this.childRef)
  }

  getRefs = (): NodeRef[] => this.props.getContextRefs(this.childRef)

  render() {
    return this.props.children(this.getRefs, this.childRef)
  }
}

const NestingChild: React.FunctionComponent<NestingProps> = ({ children }) => (
  <NestingContext.Consumer>
    {(contextValue: NestingContextValue) => (
      <NestingChildInner {...contextValue}>{children}</NestingChildInner>
    )}
  </NestingContext.Consumer>
)

export default NestingChild
