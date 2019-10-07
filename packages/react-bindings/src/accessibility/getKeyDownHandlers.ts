import { KeyActions } from '@stardust-ui/accessibility'
// @ts-ignore
import * as keyboardKey from 'keyboard-key'
import * as React from 'react'

import shouldHandleOnKeys from './shouldHandleOnKeys'
import { AccessibilityActionHandlers, AccessibilityKeyHandlers } from './types'

const rtlKeyMap = {
  [keyboardKey.ArrowRight]: keyboardKey.ArrowLeft,
  [keyboardKey.ArrowLeft]: keyboardKey.ArrowRight,
}

/**
 * Assigns onKeyDown handler to the slot element, based on Component's actions
 * and keys mappings defined in Accessibility behavior
 * @param {AccessibilityActionHandlers} componentActionHandlers Actions handlers defined in a component.
 * @param {KeyActions} behaviorActions Mappings of actions and keys defined in Accessibility behavior.
 * @param {boolean} isRtlEnabled Indicates if Left and Right arrow keys should be swapped in RTL mode.
 */
const getKeyDownHandlers = (
  componentActionHandlers: AccessibilityActionHandlers,
  behaviorActions: KeyActions,
  isRtlEnabled?: boolean,
): AccessibilityKeyHandlers => {
  const componentHandlerNames = Object.keys(componentActionHandlers)
  const slotKeyHandlers: AccessibilityKeyHandlers = {}

  if (!componentActionHandlers || !behaviorActions) {
    return slotKeyHandlers
  }

  Object.keys(behaviorActions).forEach(slotName => {
    const behaviorSlotActions = behaviorActions[slotName]
    const handledActions = Object.keys(behaviorSlotActions).filter(
      actionName => componentHandlerNames.indexOf(actionName) !== -1,
    )

    if (handledActions.length > 0) {
      slotKeyHandlers[slotName] = {
        onKeyDown: (event: React.KeyboardEvent) => {
          handledActions.forEach(actionName => {
            let keyCombinations = behaviorSlotActions[actionName].keyCombinations

            if (isRtlEnabled) {
              keyCombinations = keyCombinations.map(keyCombination => {
                const keyToRtlKey = rtlKeyMap[keyCombination.keyCode]
                if (keyToRtlKey) {
                  keyCombination.keyCode = keyToRtlKey
                }
                return keyCombination
              })
            }

            if (shouldHandleOnKeys(event, keyCombinations)) {
              componentActionHandlers[actionName](event)
            }
          })
        },
      }
    }
  })

  return slotKeyHandlers
}

export default getKeyDownHandlers
