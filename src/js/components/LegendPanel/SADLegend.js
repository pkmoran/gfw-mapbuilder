import Request from 'utils/request';
import React from 'react';

export default class SADLegend extends React.Component {
  constructor (props) {
    super(props);
    this.state = { legendInfos: [] };
  }

  componentDidMount() {
    const layerIds = this.props.layerIds;
    Request.getLegendInfos(this.props.url, layerIds).then(legendInfos => {
      this.setState({ legendInfos: legendInfos });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.legendInfos.length !== this.state.legendInfos.length;
  }

  itemMapper (item, index) {
    return (
      <div className='legend-row' key={index}>
        <img title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label' key={index}>{item.label}</div>
      </div>
    );
  }

  render () {
    return (
      <div className='legend-container'>
        {this.state.legendInfos.length === 0 ? <div className='legend-unavailable'>No Legend</div> :
          <div className='crowdsource-legend'>
            {this.state.legendInfos.map(this.itemMapper, this)}
          </div>
        }
      </div>
    );
  }
}
