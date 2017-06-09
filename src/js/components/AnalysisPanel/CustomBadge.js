import React, {PropTypes} from 'react';
// import text from 'js/languages';

const CustomBadge = (props, context) => {
  const {language} = context;
  console.log('lang', language);
  return (
    <div className='results__custom-badge'>
      <div className='results__custom-pre'>{props.chartConfig.totalArea[language]}</div>
      <div className='results__custom-count'>{props.areaHa + ' ha'}</div>
      <div className='results__custom-active'>{props.chartConfig.dataLabel[language]}</div>
      <div className='results__custom-count'>{props.value}</div>
    </div>
  );
};

CustomBadge.propTypes = {
  chartConfig: PropTypes.object.isRequired,
  areaHa: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

CustomBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { CustomBadge as default };
