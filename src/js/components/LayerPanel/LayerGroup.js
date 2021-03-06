import mapActions from 'actions/MapActions';
import React from 'react';

const closeSymbolCode = 9660,
    openSymbolCode = 9650;

/**
* Get count of active layers in this group
* @param {array} activeLayers - array of keys for the active layers
* @param {array} children - This groups child components, which are layer checkboxes or null
* @return {number} count
* <span className='active-layer-count'>({getCount(this.props.activeLayers, this.props.children)})</span>
*/
// let getCount = (activeLayers, children) => {
//   let count = 0;
//   children.forEach(layer => {
//     if (layer && layer.key && activeLayers.indexOf(layer.key) > -1) {
//       ++count;
//     }
//   });
//   return count;
// };

export default class LayerGroup extends React.Component {

  render() {
    const {activeTOCGroup, groupKey} = this.props;
    const active = activeTOCGroup === groupKey;

    return (
      <div className='layer-category'>
        <div className='layer-category-label pointer' onClick={this.toggle} title={this.props.label}>
          {this.props.label}
          <span className='layer-category-caret'>{String.fromCharCode(active ? closeSymbolCode : openSymbolCode)}</span>
        </div>
        <div className={`layer-category-content ${active ? '' : 'closed'}`}>{this.props.children}</div>
      </div>
    );
  }

  toggle = () => {
    const {activeTOCGroup, groupKey} = this.props;
    const updatedKey = activeTOCGroup === groupKey ? '' : groupKey;
    mapActions.openTOCAccordion(updatedKey);
  };

}

LayerGroup.propTypes = {
  label: React.PropTypes.string.isRequired
};
