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
      position={[company.coordinateX, company.coordinateY]}
    >
      <Popup>
        <div className="ecMainMap__popup ecMainMapPopup">
          <span className="ecMainMapPopup__name">
            {company.name}
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

  get compnyOnMap() {
    const { company } = this.props;
    const zoom = 13;
    const center = [company.coordinateX, company.coordinateY];

    if (__isBrowser__ && center[0] && center[1]) {
      const {Map, Marker, Popup, TileLayer} = require('react-leaflet');
      return (
        <Map center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a> '
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
            <MapMarker company={company} Marker={Marker} Popup={Popup}/>
        </Map>
      );
    }
    return <div>Sorry! Something goes wrong!</div>
  }

  render() {
    const { company } = this.props;

    return (
      <div className="ecMainCompanyMap">
        <div className="ecMainCompanyMap__address">
          <span>Address: {this.address}</span>
        </div>
        <div className="ecMainCompanyMap__map">
          <ExpandCollapseWrapper name="Map">
            {company && this.compnyOnMap}
          </ExpandCollapseWrapper>
        </div>
      </div>
    );
  }
}

EcMainCompanyMap.defaultProps = {
  company: {}
};