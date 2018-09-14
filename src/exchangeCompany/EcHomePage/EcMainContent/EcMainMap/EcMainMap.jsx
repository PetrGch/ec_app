import React from 'react';

import {sortedByPrice} from "../EcCurrencyMainTable/ecCurrencyMainTableUtil";

import mapMarkerIcon from './map-marker.svg';

import './ecMainMap.less';

function mapMarker(L) {
  return new L.Icon({
  iconUrl: mapMarkerIcon,
  iconRetinaUrl: mapMarkerIcon,

  iconSize:     [50, 60],
  iconAnchor:   [40, 58],
  popupAnchor:  [-14, -54],

  className: 'ecMainMapMarker'
});
}

function Markers({records, Marker, Popup, mapMarker}) {
  return records.filter(record => {
    return record.coordinateX && record.coordinateY;
  }).map(record => (
    <Marker
      key={`${record.coordinateX}-${record.coordinateY}`}
      icon={ mapMarker }
      position={[record.coordinateX, record.coordinateY]}
    >
      <Popup>
        <div className="ecMainMap__popup ecMainMapPopup">
          <span className="ecMainMapPopup__name">
            {record.name}
          </span>
          <span className="ecMainMapPopup__address">
            {record.address}
          </span>
        </div>
      </Popup>
    </Marker>)
  );
}

export default class EcMainMap extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {records, isBuyStatus} = nextProps;
    const propsCenter = sortedByPrice(records, true, isBuyStatus)
      .filter(record => record.coordinateX && record.coordinateY)[0] || {};
    const center = propsCenter.coordinateX && propsCenter.coordinateY
      ? [propsCenter.coordinateX, propsCenter.coordinateY] : [];

    if (center[0] !== prevState.center[0]) {
      return {
        ...prevState,
        center: center
      }
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      center: [],
    }
  }

  render() {
    const {records} = this.props;
    const {center, zoom} = this.state;
    if (__isBrowser__ && center.length !== 0) {
      const {Map, Marker, Popup, TileLayer} = require('react-leaflet');
      const L = require('leaflet');
      const marker = mapMarker(L);

      return (
        <div className="ecMainMap">
          {(records && records.length !== 0) && <Map center={center} zoom={zoom}>
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a> '
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {<Markers records={records} Marker={Marker} Popup={Popup} mapMarker={marker}/>}
          </Map>}
        </div>
      )
    } else {
      return <div>Server rendering mode</div>;
    }
  }
}