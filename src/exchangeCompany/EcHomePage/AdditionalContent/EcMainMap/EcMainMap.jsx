import React from 'react';

import {sortedByPrice} from "../../EcMainContent/EcCurrencyMainTable/ecCurrencyMainTableUtil";
import mapMarkerIcon from './map-marker.svg';

import './ecMainMap.less';

export function mapMarker(L) {
  return new L.Icon({
    iconUrl: mapMarkerIcon,
    iconRetinaUrl: mapMarkerIcon,

    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],

    className: 'ecMainMapMarker'
  });
}

function Markers({records, Marker, Popup, mapMarker}) {
  return records
    .filter(record => record.lat && record.lng)
    .map(record => {
      return (
        <Marker
          key={`${record.lat}-${record.lng}`}
          icon={mapMarker}
          position={[record.lat, record.lng]}
        >
          <Popup>
            <div className="ecMainMap__popup ecMainMapPopup">
              <span className="ecMainMapPopup__name">
                {record.branch_name}
              </span>
              {record.address && <span className="ecMainMapPopup__address">
                Address: {record.address}
              </span>}
              {record.buy_price && record.sell_price && <div className="ecMainMapPopup__price">
                <span>Buy: {record.buy_price}</span>
                <span> Sell: {record.sell_price}</span>
              </div>}
            </div>
          </Popup>
        </Marker>
        )
      }
    );
}

export default class EcMainMap extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRowRecord } = nextProps;
    const selectedCoordinates = selectedRowRecord && selectedRowRecord.lat && selectedRowRecord.lng
      ? [selectedRowRecord.lat, selectedRowRecord.lng] : null;

    if (selectedCoordinates && JSON.stringify(prevState.center) !== JSON.stringify(selectedCoordinates)) {
      return {
        center: selectedCoordinates,
        zoom: 16
      }
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      center: ["13.7563", "100.5018"]
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
            <Markers
              records={records}
              Marker={Marker}
              Popup={Popup}
              mapMarker={marker}
            />
          </Map>}
        </div>
      )
    } else {
      return <div>Sorry! Something goes wrong.</div>;
    }
  }
}