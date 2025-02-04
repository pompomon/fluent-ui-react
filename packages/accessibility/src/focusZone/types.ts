export enum FocusZoneMode {
  Custom,
  Wrap,
  Embed,
}

export type FocusZoneDefinition = {
  mode: FocusZoneMode
  props?: FocusZoneProperties
}

// Heads up! Keep in sync with FocusZone.types.ts
export interface FocusZoneProperties {
  /**
   * Defines which arrows to react to.
   * It has next options: horizontal, vertical, bidirectional, bidirectionalDomOrder.
   * @default FocusZoneDirection.bidirectional
   */
  direction?: FocusZoneDirection

  /**
   * Function which uses root element as parameter to return the intial tabbable element.
   * For example, when there is a chat with a bottom-up approach, it is expected that the last chat message is tabbable (active), not the first default one.
   */
  defaultTabbableElement?: (root: HTMLElement) => HTMLElement

  /**
   * If a default tabbable element should be force focused on FocusZone mount.
   */
  shouldFocusOnMount?: boolean

  /**
   * if true and FocusZone's root element (container) receives focus, the focus will land either on the defaultTabbableElement
   * (if set) or on the first tabbable element of this FocusZone.
   * Usually a case for nested focus zones, when nested focus zone's container is a focusable element.
   */
  shouldFocusInnerElementWhenReceivedFocus?: boolean

  /**
   * If true and TAB key is not handled by FocusZone, resets current active element to null value.
   * For example, when roving index is not desirable and focus should always reset to the default tabbable element.
   */
  shouldResetActiveElementWhenTabFromZone?: boolean

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean

  /**
   * If true, FocusZone behavior will change to match RTL environments (left/right arrows switched).
   */
  isRtl?: boolean

  /**
   * If true, will cycle to the beginning of the targets once the user attempts to navigate past the last
   * target while at the end, and to the end when the user attempts to naviagate before the first target.
   */
  isCircularNavigation?: boolean

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  shouldReceiveFocus?: (childElement?: HTMLElement) => boolean

  /**
   * Allows TAB key to be handled, thus alows tabbing through a focusable list of items in the
   * focus zone. A side effect is that users will not be able to TAB out of the focus zone and
   * have to hit escape or some other key to exit focus zone.
   * Enum options:
   * none - tabbing is not allowed
   * all - all tabbing action is allowed
   * inputOnly - tabbing is allowed only on input elements
   */
  handleTabKey?: FocusZoneTabbableElements

  /**
   * Callback function that will be executed on keypresses to determine if the user intends to navigate into
   * the inner (nested) zone. Returning true will ask the first inner zone to set focus.
   * For example, when chat container is FocusZone and chat messages are inner focus zones.
   * Navigation between messages possible with up/down arrow keys, but when pressing Enter, focus should go to
   * focusable elements inside message, for example, a link.
   */
  shouldEnterInnerZone?: Function

  /**
   * A callback method to determine if the input element should lose focus on arrow keys.
   * For example: use arrow keys to navigate when an input element is empty or when cursor is at the beginning/end of a string.
   * @param {HTMLInputElement} inputElement The input element which is to lose focus.
   * @returns True if input element should lose focus or false otherwise.
   */
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean

  /**
   * If true, focus event propagation will be stopped.
   */
  stopFocusPropagation?: boolean

  /**
   * If true, FocusZone prevents default behavior.
   */
  preventDefaultWhenHandled?: boolean

  /**
   * If focus is on root element after componentDidUpdate, will attempt to restore the focus to inner element
   */
  restoreFocusFromRoot?: boolean
}

export enum FocusZoneTabbableElements {
  /** Tabbing is not allowed */
  none = 0,

  /** All tabbing action is allowed */
  all = 1,

  /** Tabbing is allowed only on input elements */
  inputOnly = 2,
}

export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical = 0,

  /** Only react to left/right arrows. */
  horizontal = 1,

  /** React to all arrows. */
  bidirectional = 2,

  /** React to all arrows. Navigate next item on right/down arrow keys and previous - left/up arrow keys. Vice versa in RTL mode. */
  bidirectionalDomOrder = 3,
}
