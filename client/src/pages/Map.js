import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import "../App.css";
const Map = (props) => {
    const mapRef = useRef();
    useEffect(
        () => {
            // lazy load the required ArcGIS API for JavaScript modules and CSS
            loadModules([
                "esri/views/MapView",
                "esri/Map",
                "esri/layers/FeatureLayer",
                "esri/widgets/Expand",], { css: true })
                .then(([MapView, ArcGISMap, FeatureLayer, Expand]) => {
                    let floodLayerView;
                    const layer = new FeatureLayer({
                        portalItem: {
                            id: "f9e348953b3848ec8b69964d5bceae02"
                        },
                        outFields: ["SEASON"]
                    });

                    const map = new ArcGISMap({
                        basemap: "gray-vector",
                        layers: [layer]
                    });

                    // load the map view at the ref's DOM node
                    const view = new MapView({
                        map: map,
                        container: mapRef.current,
                        center: [-98, 40],
                        zoom: 4
                    });


                    const seasonsNodes = document.querySelectorAll(`.season-item`);
                    const seasonsElement = document.getElementById("seasons-filter");

                    seasonsElement.addEventListener("click", filterBySeason);
                    function filterBySeason(event) {
                        const selectedSeason = event.target.getAttribute("data-season");
                        floodLayerView.filter = {
                            where: "Season = '" + selectedSeason + "'"
                        };
                    }
                    view.whenLayerView(layer).then(function (layerView) {

                        // flash flood warnings layer loaded
                        // get a reference to the flood warnings layerview
                        floodLayerView = layerView;

                        // set up UI items
                        seasonsElement.style.visibility = "visible";
                        const seasonsExpand = new Expand({
                            view: view,
                            content: seasonsElement,
                            expandIconClass: "esri-icon-filter",
                            group: "top-left"
                        });
                        //clear the filters when user closes the expand widget
                        seasonsExpand.watch("expanded", function () {
                            if (!seasonsExpand.expanded) {
                                floodLayerView.filter = null;
                            }
                        });
                        view.ui.add(seasonsExpand, "top-left");
                        view.ui.add("titleDiv", "top-right");
                    });

                })

            // const geoJSONLayer = new GeoJSONLayer({
            //     url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
            //     //url:require('./population.json'),
            //     copyright: "USGS Earthquakes",
            //     // blendMode: 'multiply',
            //     outFields: ["*"],
            //     popupTemplate: {
            //         // Enable a popup
            //         title: "{type}", // Show attribute value
            //         content: "{title}" // Display in pop-up
            //     }
            // });
            // map.add(geoJSONLayer);


        }, []
    );

    return (
        <>
            <div id="seasons-filter" className="esri-widget">
                <div className="season-item visible-season" data-season="Winter">Winter</div>
                <div className="season-item visible-season" data-season="Spring">Spring</div>
                <div className="season-item visible-season" data-season="Summer">Summer</div>
                <div className="season-item visible-season" data-season="Fall">Fall</div>
            </div>
            <div id="viewDiv" style={{ height: '80vh' }} ref={mapRef}></div>
            <div id="titleDiv" className="esri-widget">
                <div id="titleText">Flash Floods by Season</div>
                <div>Flash Flood Warnings (2002 - 2012)</div>
            </div>
        </>
    );
};

export default Map;