import { Grid, gridBehavior, Box, Text } from '@stardust-ui/react'
import * as React from 'react'
import * as _ from 'lodash'

import GridImagePickerItem, { GridPickerItemProps } from './GridFilePickerItem'

export interface GridPickerProps {
  items: GridPickerItemProps[]
  gridColumns?: string | number
  title?: string
  role?: string
  asMenu?: boolean
}

const gridStyles = {
  listStyle: 'none',
  padding: '0',
  gridRowGap: '20px',
  gridColumnGap: '20px',
}

class GridImagePicker extends React.Component<GridPickerProps> {
  static defaultProps = {
    gridColumns: 5,
  }

  render() {
    const { gridColumns, title, role = 'list' } = this.props
    const titleId = title.replace(/\s/g, '')

    return (
      <Box styles={{ margin: '30px' }}>
        <Text size="large" id={titleId}>
          {title}
        </Text>
        <Grid
          as="ul"
          role={role}
          accessibility={gridBehavior}
          aria-labelledby={titleId}
          columns={gridColumns}
          style={gridColumns === 1 ? { ...gridStyles, width: '200px' } : gridStyles}
          content={this.renderGridItems()}
          aria-orientation="horizontal"
        />
      </Box>
    )
  }

  renderGridItems() {
    return _.map(this.props.items, item => (
      <GridImagePickerItem {...item} asMenuItem={this.props.asMenu} />
    ))
  }
}

export default GridImagePicker
