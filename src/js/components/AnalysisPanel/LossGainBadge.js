import React, {PropTypes} from 'react';
import text from 'js/languages';
import {analysisConfig} from 'js/config';
import analysisKeys from 'constants/AnalysisConstants';

const LossGainBadge = (props, context) => {

  const {lossTotal, gainTotal, lossFromSelectIndex, lossToSelectIndex} = props;
  const {language} = context;
  const labelArray = analysisConfig[analysisKeys.TC_LOSS].labels;


  return (
    <div className='results__loss-gain'>
      <div className='results__loss-badge'>
        <div className='results__loss-gain--label'>{text[language].ANALYSIS_TOTAL_LOSS_LABEL}</div>
        <div className='results__loss-gain--range'>{labelArray[lossFromSelectIndex]} &ndash; {labelArray[lossToSelectIndex]}</div>
        <span className='results__loss--count'>{lossTotal}</span>
        <span className='results__loss--unit'>Ha</span>
      </div>
      <div className='results__gain-badge'>
        <div className='results__loss-gain--label'>{text[language].ANALYSIS_TOTAL_GAIN_LABEL}</div>
        <div className='results__loss-gain--range'>{text[language].ANALYSIS_TOTAL_GAIN_RANGE}</div>
        <span className='results__gain--count'>{gainTotal}</span>
        <span className='results__gain--unit'>Ha</span>
      </div>
    </div>
  );
};

LossGainBadge.propTypes = {
  lossTotal: PropTypes.number.isRequired,
  gainTotal: PropTypes.number.isRequired
};

LossGainBadge.contextTypes = {
  language: PropTypes.string.isRequired
};

export { LossGainBadge as default };
