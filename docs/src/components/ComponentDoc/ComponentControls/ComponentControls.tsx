import { CopyToClipboard } from '@stardust-ui/docs-components'
import { Menu, Provider, ThemeInput, menuAsToolbarBehavior } from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import ComponentButton from './ComponentButton'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import ComponentControlsCodeSandbox from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'

type ComponentControlsProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  examplePath: string
  anchorName: string
  onCopyLink: (e: React.SyntheticEvent) => void
  onShowCode: (e: React.SyntheticEvent) => void
  onShowRtl: (e: React.SyntheticEvent) => void
  onShowTransparent: (e: React.SyntheticEvent) => void
  onShowVariables: (e: React.SyntheticEvent) => void
  showCode: boolean
  showRtl: boolean
  showVariables: boolean
  showTransparent: boolean
  toolbarAriaLabel?: string
}

const controlsTheme: ThemeInput = {
  componentStyles: {
    MenuItem: {
      root: {
        padding: '0.25rem',
      },
      wrapper: {
        display: 'inline-table',
        ':last-child': {
          margin: 0,
        },
      },
    },
    Text: {
      root: {
        whiteSpace: 'nowrap',
      },
    },
  },
}

const ComponentControls: React.FC<ComponentControlsProps> = props => {
  const {
    anchorName,
    exampleCode,
    exampleLanguage,
    examplePath,
    showCode,
    showRtl,
    showVariables,
    showTransparent,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowTransparent,
    onShowVariables,
    toolbarAriaLabel,
    ...rest
  } = props

  return (
    <Provider theme={controlsTheme} as={React.Fragment}>
      <Menu
        {...rest}
        fluid
        pills
        accessibility={menuAsToolbarBehavior}
        aria-label={toolbarAriaLabel || null}
        items={[
          {
            key: 'show-code',
            content: <ComponentButton iconName="code" label="Try it" />,
            onClick: onShowCode,
            active: showCode,
          },
          {
            key: 'show-codesandbox',
            content: (
              <ComponentControlsCodeSandbox
                exampleCode={exampleCode}
                exampleLanguage={exampleLanguage}
                exampleName={examplePath}
              />
            ),
          },
          {
            key: 'show-variables',
            content: <ComponentButton iconName="paint brush" label="Theme it" />,
            onClick: onShowVariables,
            active: showVariables,
          },
          {
            key: 'show-transparent',
            content: <ComponentButton iconName="adjust" label="Transparent" />,
            onClick: onShowTransparent,
            active: showTransparent,
          },
          {
            key: 'show-rtl',
            content: <ComponentButton iconName="align right" label="RTL" />,
            onClick: onShowRtl,
            active: showRtl,
          },
          {
            key: 'maximize',
            content: <ComponentButton iconName="external alternate" label="Popout" />,
            as: NavLink,
            to: `/maximize/${_.kebabCase(
              examplePath
                .split('/')
                .slice(-1)
                .pop(),
            )}/${showRtl}`,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            key: 'copy-link',
            content: (
              <CopyToClipboard value={anchorName}>
                {(active, onClick) => (
                  <ComponentButton
                    iconName="linkify"
                    label={active ? 'Copied!' : 'Permalink'}
                    onClick={onClick}
                  />
                )}
              </CopyToClipboard>
            ),
            onClick: onCopyLink,
          },
        ]}
      />
    </Provider>
  )
}

export default React.memo(ComponentControls)
