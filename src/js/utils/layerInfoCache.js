/**
* Cache for information about each layer, to be shown in the modal
*/
import esriRequest from 'esri/request';
import Deferred from 'dojo/Deferred';
import {urls} from 'js/config';

const _cache = {};

/**
* Fetch the metadata from GFW's Metadata API
* @param {string} url - api url plus technical name, e.g. urls.metadataApi + '/tree_cover_loss'
* @return {Deferred} promise
*/
function getMetadataTask (url) {
  const promise = new Deferred();
  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    promise.resolve(JSON.parse(request.response));
  });
  request.open('GET', url);
  request.send();
  return promise;
}

/**
* Fetch the metadata from ArcGIS Online via the item Id
* @param {string} url - Url includes the item id and refers to ArcGIS Online sharing url, urls.metadataXmlEndpoint(layer.itemId)
* @return {Deferred} promise
*/
function getXMLTask (url) {
  return esriRequest({
    url,
    handleAs: 'xml',
    callbackParamName: 'callback'
  });
}

/**
* Fetch the metadata from ArcGIS MapService, this is the last resort
* @param {string} url - Map Service URL
* @return {Deferred} promise
*/
function getServiceInfoTask (url) {
  return esriRequest({
    url,
    handleAs: 'json',
    content: {f: 'json'},
    callbackParamName: 'callback'
  });
}

/**
* Reduce the xml document to the desired JSON format
* @param {document} xmlDoc - xml document to parse
* @return {object} result
* @return {string} result.title
* @return {string} result.subtitle
* @return {string} result.cautions
* @return {string} result.overview
* @return {string} result.citation
* @return {string} result.source
* @return {string} result.other
* @return {string} result.function
* @return {string} result.download_data
* @return {string} result.tags
* @return {string} result.learn_more
* @return {string} result.frequency_of_updates
* @return {string} result.geographic_coverage
* @return {string} result.license
* @return {string} result.date_of_content
* @return {string} result.resolution
*/
function reduceXML (xmlDoc) {
  const result = {};
  const title = xmlDoc.querySelector('resTitle'),
        subtitle = xmlDoc.querySelector('resAltTitle'),
        learn_more = xmlDoc.querySelectorAll('citOnlineRes linkage'),
        citation = xmlDoc.querySelector('otherCitDet'),
        functions = xmlDoc.querySelector('idPurp'),
        overview = xmlDoc.querySelector('idAbs'),
        other = xmlDoc.querySelector('suppInfo'),
        resolution = xmlDoc.querySelector('value'),
        tags = xmlDoc.querySelector('searchKeys'),
        geographic_coverage = xmlDoc.querySelector('exDesc'),
        date_of_content = xmlDoc.querySelector('tempDesc'),
        frequency_of_updates = xmlDoc.querySelector('duration'),
        license = xmlDoc.querySelector('LegConsts useLimit'),
        cautions = xmlDoc.querySelector('Consts useLimit'),
        source = xmlDoc.querySelector('srcDesc'),
        download_data = xmlDoc.querySelectorAll('onLineSrc linkage');

  if (title) {
    result.title = title.innerHTML;
  }

  if (subtitle) {
    result.subtitle = subtitle.innerHTML;
  }

  if (learn_more.length) {
    result.learn_more = learn_more[0].innerHTML;
  }

  if (citation) {
    result.citation = citation.innerHTML;
  }

  if (functions) {
    result.function = functions.innerHTML;
  }

  if (overview) {
    result.overview = overview.innerHTML;
  }

  if (other) {
    result.other = other.innerHTML;
  }

  if (resolution) {
    result.resolution = resolution.innerHTML;
  }

  if (tags) {
    const keywords = [];
    for (let i = 0; i < tags.children.length; i++) {
      keywords.push(tags.children[i].innerHTML);
    }
    result.tags = keywords.join(', ');
  }

  if (geographic_coverage) {
    result.geographic_coverage = geographic_coverage.innerHTML;
  }

  if (date_of_content) {
    result.date_of_content = date_of_content.innerHTML;
  }

  if (frequency_of_updates) {
    result.frequency_of_updates = frequency_of_updates.innerHTML;
  }

  if (license) {
    result.license = license.innerHTML;
  }

  if (cautions) {
    result.cautions = cautions.innerHTML;
  }

  if (source) {
    result.source = source.innerHTML;
  }

  if (download_data) {
    result.download_data = download_data[0].innerHTML;
  }

  return result;
}

export default {

  get (layerId) {
    return _cache[layerId];
  },

  fetch (layer) {
    const promise = new Deferred();
    let url;
    // If a technicalName is configured, fetch from the metadata API
    // else, attempt to fetch it from the mapservice
    if (layer.technicalName) {
      url = `${urls.metadataApi}/${layer.technicalName}`;
      getMetadataTask(url).then(results => {
        _cache[layer.id] = results;
        promise.resolve(results);
      });
    } else if (layer.itemId) {
      // This commented out URL contains a good item id to use for testing
      // url = urls.metadataXmlEndpoint('30e234e880c94a2ca54be9a132808eae');
      url = urls.metadataXmlEndpoint(layer.itemId);
      getXMLTask(url).then(xmlDocument => {
        promise.resolve(reduceXML(xmlDocument));
      }, () => { promise.resolve(); });
    } else if (layer.esriLayer) {
      const {esriLayer, subIndex, subId} = layer;
      url = `${esriLayer.url}/${subIndex !== undefined ? subIndex : ''}`;
      getServiceInfoTask(url, {f: 'json'}).then(results => {
        _cache[subId] = results;
        promise.resolve(results);
      });
    } else {
      promise.resolve();
    }
    return promise;
  }

};
