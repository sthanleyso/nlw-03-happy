import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';

import '../styles/pages/orphanages-map.css';
import mapMarkerImg from '../assets/map-marker.svg';

import mapIcon from '../utils/mapIcon';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    async function loadOrphanages() {
      await api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    }

    loadOrphanages();
  }, []);

  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='Happy' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas cianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Tacima</strong>
          <span>Paraíba</span>
        </footer>
      </aside>

      <Map
        center={[-6.489902, -35.637461]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className='map-popup'
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color='#FFFFFF' />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color='#FFFFFF' />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
