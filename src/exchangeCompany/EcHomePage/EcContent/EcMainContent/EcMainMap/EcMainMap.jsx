import React from 'react';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import {sortedByPrice} from "../EcCurrencyMainTable/ecCurrencyMainTableUtil";

import mapMarker from './map-marker.svg';

import './ecMainMap.less';

const iconPerson = new L.Icon({
  iconUrl: mapMarker,
  iconRetinaUrl: mapMarker,

  iconSize:     [50, 60],
  iconAnchor:   [40, 58],
  popupAnchor:  [-14, -54],

  className: 'ecMainMapMarker'
});

function Markers({records}) {
  return records.filter(record => {
    return record.coordinateX && record.coordinateY;
  }).map(record => (
    <Marker
      key={`${record.coordinateX}-${record.coordinateY}`}
      icon={ iconPerson }
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
    const propsCenter = sortedByPrice(records, true, isBuyStatus)[0] || {};
    const center = propsCenter.coordinateX && propsCenter.coordinateY
      ? [propsCenter.coordinateX, propsCenter.coordinateY] : [];
    if (center[0] !== prevState.center[0] ) {
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

    return (
      <div className="ecMainMap">
        {(records && records.length !== 0) && <Map center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
          {<Markers records={records}/>}
        </Map>}
      </div>
    )
  }
}