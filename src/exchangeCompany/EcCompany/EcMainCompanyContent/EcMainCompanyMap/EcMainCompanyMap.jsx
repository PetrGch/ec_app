import React from 'react';

import ExpandCollapseWrapper from "../ExpandCollapseWrapper/ExpandCollapseWrapper";
import {mapMarker} from "../../../EcHomePage/EcMainContent/EcMainMap/EcMainMap";

import './ecMainCompanyMap.less';

function MapMarker({company, Marker, Popup}) {
  const L = require('leaflet');
  const marker = mapMarker(L);
  return (
    <Marker
      icon={marker}
      position={[company.lat, company.lng]}
    >
      <Popup>
        <div className="ecMainMap__popup ecMainMapPopup">
          <span className="ecMainMapPopup__name">
            {company.branch_name}
          </span>
          <span className="ecMainMapPopup__address">
            {company.address}
          </span>
        </div>
      </Popup>
    </Marker>
  );
}

export default class EcMainCompanyMap extends React.PureComponent {
  get address() {
    const { company } = this.props;
    return (company && company.address) || '--//--';
  }

  get companyOnMap() {
    const { filteredCurrency } = this.props;
    const zoom = 13;
    const center = [filteredCurrency.lat, filteredCurrency.lng];

    if (__isBrowser__ && center[0] && center[1]) {
      const {Map, Marker, Popup, TileLayer} = require('react-leaflet');
      return (
        <Map center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a> '
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
            <MapMarker company={filteredCurrency} Marker={Marker} Popup={Popup}/>
        </Map>
      );
    }
    return <div>Sorry! Something goes wrong!</div>
  }

  render() {
    const { filteredCurrency } = this.props;

    return (
      <div className="ecMainCompanyMap">
        <div className="ecMainCompanyMap__address">
          <span>Address: {this.address}</span>
        </div>
        <div className="ecMainCompanyMap__map">
          <ExpandCollapseWrapper name="Map">
            {filteredCurrency && this.companyOnMap}
          </ExpandCollapseWrapper>
        </div>
      </div>
    );
  }
}

EcMainCompanyMap.defaultProps = {
  filteredCurrency: {}
};