import React, { useState, useEffect } from 'react';
import "../App.css";
import axios from "axios";
import L from 'leaflet'
import { EditControl } from "react-leaflet-draw"
const { Map: LeafletMap, TileLayer, Marker, Popup, Polygon, Rectangle, Polyline, LayerGroup, Circle, LayersControl, FeatureGroup,GeoJSON } = require('react-leaflet')
const { BaseLayer, Overlay } = LayersControl

const Leafletmap = () => {
    // const [lat, setlat] = useState(51.505);
    // const [lng, setlng] = useState(-0.09); 
    const [lat, setlat] = useState(31.205753);//alexandria egypt coordinates
    const [lng, setlng] = useState(29.924526);
    const [zoom, setzoom] = useState(14);
    const [shopGEOjson, setshopGEOjson] = useState(undefined);
    const [zipcodeGEOjson, setzipcodeGEOjson] = useState(undefined);
    useEffect(() => {
        axios.get('http://dev-diylife.co:8000/shops/')
            .then(response => {
                setshopGEOjson(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
        axios.get('http://dev-diylife.co:8000/zipcodes/')
            .then(response => {
                setzipcodeGEOjson(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []);
    var geojsonFeature = {
        "feautures": [
            {
                "type": "Feature",
                "properties": {
                    "ID": 1,
                    "name": "Coors Field",
                    "amenity": "foodcourt",
                    "popupContent": "This is where the Rockies play!"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.09, 51.505]
                }
            }, {
                "type": "Feature",
                "properties": {
                    "ID": 2,
                    "name": " Building",
                    "amenity": " Stadium",
                    "popupContent": "This is where the Rockies play!"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[51.49, -0.08],
                    [51.5, -0.06],]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "ID": 3,
                    "name": " Field",
                    "amenity": " soil",
                    "popupContent": "This is where the Rockies play!"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [51.51, -0.05],
                            [51.51, -0.07],
                            [51.53, -0.07],
                        ]
                    ]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "ID": 3,
                    "name": " Bridge",
                    "amenity": " street",
                    "popupContent": "This is where the Rockies play!"
                },
                "geometry": {
                    "type": "Polyline",
                    "coordinates": [
                        [51.505, -0.09],
                        [51.51, -0.1],
                        [51.51, -0.12],
                    ]
                }
            }
        ]
    };
    // var anotherGEOjson = {
    //     "type": "FeatureCollection",
    //     "crs": { "type": "name", "properties": { "name": "EPSG:4326" } },
    //     "features": [
    //         {
    //             "type": "Feature",
    //             "properties": {
    //                 "name": "Test",
    //                 "address": "Test",
    //                 "city": "Alexandria",
    //                 "pk": "1"
    //             },
    //             "geometry": {
    //                 "type": "Point",
    //                 "coordinates": [30.009284015292625, 31.279357761823448]
    //             }
    //         }
    //     ]
    // }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <LeafletMap center={[lat, lng]} zoom={zoom} drawControl={true}>
                <LayersControl position="topright">
                    <BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </BaseLayer>
                    <FeatureGroup>
                        <EditControl
                            position="topright"
                            onEdited={e => {
                                e.layers.eachLayer(a => {
                                    console.log('drawn polygon', a.toGeoJSON())
                                });
                            }}
                            edit={{ remove: false }}
                            draw={{
                                marker: false,
                                circle: false,
                                rectangle: false,
                                polygon: false,
                                polyline: false
                            }}
                        />
                        {/* <Polygon positions={[lat, lng]} />; */}

                    </FeatureGroup>
                    <Overlay checked name="blue circles">
                        <Circle center={[lat, lng]} fillColor="blue" radius={300} >
                            <Popup>
                                blue circle</Popup>
                        </Circle>

                    </Overlay>
                    <Overlay checked name="red circles">
                        <Circle center={[lat, lng]} fillColor="red" radius={200} stroke={false}>
                            <Popup>
                                red circle</Popup>
                        </Circle>
                    </Overlay>

                    <Overlay checked name="green circles">
                        <Circle
                            center={[lat, lng]}
                            color="green"
                            fillColor="green"
                            radius={100}
                        >
                            <Popup>
                                green circle</Popup>
                        </Circle>
                    </Overlay>
                    {shopGEOjson ? shopGEOjson.features.map(el => (

                        <Overlay key={el.properties.pk} checked name={"Marker with popup" + el.properties.pk}>
                            <Marker
                                position={[
                                    el.geometry.coordinates[1],
                                    el.geometry.coordinates[0]
                                ]}
                            >
                                <Popup>
                                    {el.properties.name} <br />{el.properties.address}</Popup>
                            </Marker>
                        </Overlay>
                    )) : null}
                    {/* {zipcodeGEOjson ? zipcodeGEOjson.features.map(el => (
                        el.geometry.type === "Polygon" ?
                            <Overlay key={el.properties.pk} name={"polygon with popup" + el.properties.pk}>
                                <Polygon color="purple" positions={el.geometry.coordinates}>
                                    <Popup>
                                        {el.properties.code} </Popup>
                                </Polygon>
                            </Overlay> :
                            el.geometry.type === "Polyline" ?
                                <Polyline color="lime" positions={el.geometry.coordinates} >
                                    <Popup>
                                        {el.properties.code} </Popup>
                                </Polyline>
                                :
                                <Rectangle bounds={el.geometry.coordinates} color="black">
                                    <Popup>
                                        {el.properties.code} </Popup>
                                </Rectangle>
                    )) : null} */}
                    {zipcodeGEOjson ? zipcodeGEOjson.features.map(el => (
                        <Overlay key={el.properties.pk} name={"polygon " + el.properties.pk}>
                            <GeoJSON data={el}></GeoJSON>
                        </Overlay>
                    )) : null}

                </LayersControl>
            </LeafletMap>
        </div >

    );
};

export default Leafletmap;