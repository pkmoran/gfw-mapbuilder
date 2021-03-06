import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {Component, PropTypes} from 'react';

export default class Modal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired
  };

  renderFromMetadataAPI (info) {
    const {language} = this.context;
    return (
      <div className='layer-modal-content'>
        <div className='source-header'>
          <h2 className='source-title'>{info.title}</h2>
          <h3 className='source-subtitle'>{info.subtitle}</h3>
        </div>
        <div className='source-body'>
          <div className='source-table'>
            {!info.function ? null : this.tableMap(text[language].FUNCTION, info.function)}
            {!info.resolution ? null : this.tableMap(text[language].RESOLUTION, info.resolution)}
            {!info.geographic_coverage ? null : this.tableMap(text[language].GEO_COVERAGE, info.geographic_coverage)}
            {!info.source ? null : this.tableMap(text[language].SOURCE, info.source)}
            {!info.frequency_of_updates ? null : this.tableMap(text[language].FREQUENCY, info.frequency_of_updates)}
            {!info.date_of_content ? null : this.tableMap(text[language].CONTENT_DATE, info.date_of_content)}
            {!info.cautions ? null : this.tableMap(text[language].CAUTIONS, info.cautions)}
            {!info.license ? null : this.tableMap(text[language].LICENSE, info.license)}
          </div>
          {!info.overview ? null :
            <div className='source-summary'>
              <h3>{text[language].OVERVIEW}</h3>
              <div dangerouslySetInnerHTML={{ __html: info.overview }} />
            </div>
          }
          {!info.citation ? null :
            <div className='source-credits'>
              <h4>{text[language].CITATION}:</h4>
              <div dangerouslySetInnerHTML={{ __html: info.citation }} />
            </div>
          }
          {!info.learn_more ? null :
            <div className='source-learn-more flex'>
              <a href={info.learn_more} className='source-learn-more-link fa-button white' target='_blank'>
                {text[language].LEARN_MORE}
              </a>
            </div>
          }
        </div>
        {!info.download_data ? null :
          <div className='source-footer'>
            <a href={info.download_data} className='source-download fa-button gold' target='_blank'>
              {text[language].DOWNLOAD_DATA}
            </a>
          </div>
        }
      </div>
    );
  }

  renderFromMapService (info) {
    const {language} = this.context;
    return (
      <div className='layer-modal-content'>
        <div className='source-header'>
          <h2 className='source-title'>{info.name}</h2>
          <h3 className='source-subtitle'>{info.type}</h3>
        </div>
        <div className='source-table'>
          {this.tableMap(text[language].DESCRIPTION, info.description || text[language].NO_INFO)}
          {this.tableMap(text[language].CITATION, info.copyrightText || text[language].NO_INFO)}
        </div>
      </div>
    );
  }

  tableMap (label, content) {
    return (
      <dl className='source-row'>
        <dt>{label}</dt>
        <dd dangerouslySetInnerHTML={{ __html: content }}></dd>
      </dl>
    );
  }

  close = () => {
    mapActions.toggleLayerModal({ visible: false });
  };

  render () {
    const {language} = this.context;
    const {info} = this.props;
    const theme = info && info.download_data ? '' : 'no-download';
    const content = !info ? <div className='no-info-available'>{text[language].NO_INFO}</div> :
      (info.title ?
        this.renderFromMetadataAPI(info) :
        this.renderFromMapService(info)
      );

    return (
      <ControlledModalWrapper onClose={this.close} theme={theme}>
        {content}
      </ControlledModalWrapper>
    );
  }

}
