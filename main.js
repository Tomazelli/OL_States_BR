import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import {DragBox, Select} from "ol/interaction";
import {OSM, Vector as VectorSource} from "ol/source";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import {platformModifierKeyOnly} from "ol/events/condition";

let vectorSource = new VectorSource({
  url: "https://www.rocklabdigital.com/static/geojson/estado.geojson",
  format: new GeoJSON()
});

let map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new VectorLayer({
      source: vectorSource
    }) ],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
    constrainRotation: 16
  })
});

// a normal select interaction to handle click
let select = new Select();
map.addInteraction(select);

let selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
let dragBox = new DragBox({
  condition: platformModifierKeyOnly
});

map.addInteraction(dragBox);

dragBox.on("boxend", function () {
  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  let rotation = map.getView().getRotation();
  let oblique = rotation % (Math.PI / 2) !== 0;
  let candidateFeatures = (
    oblique ? [] : selectedFeatures
  );
  let extent = dragBox.getGeometry().getExtent();
  vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
    candidateFeatures.push(feature);
  });

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    let anchor = [0, 0];
    var geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    let extent$1 = geometry.getExtent();
    candidateFeatures.forEach(function (feature) {
      var geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent$1)) {
        selectedFeatures.push(feature);
      }
    });
  }
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on("boxstart", function () {
  selectedFeatures.clear();
});

let infoBox = document.getElementById("info");

selectedFeatures.on(["add", "remove"], function () {
  let names = selectedFeatures.getArray().map(function (feature) {
    return feature.get("name");
  });
  if (names.length > 0) {
    infoBox.innerHTML = names.join(", ");
  } else {
    infoBox.innerHTML = "No countries selected";
  }
});