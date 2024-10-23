import Alpine from 'alpinejs';
import mapUtils from '../utils/map';

function MapViewerStatic(projectOptions) {
  return {
    mapIsSmall: true,
    project: null,
    mapModal: null,
    map: null,
    zoom: 11,
    get isLoading() {
      return this.$store.geolocation.isLoading;
    },
    async init() {
      this.project = {
        ...projectOptions,
        commune: {
          ...projectOptions.commune,
          latitude: projectOptions.commune.latitude,
          longitude: projectOptions.commune.longitude,
        },
      };
      const latitude = this.project.location_x;
      const longitude = this.project.location_y;
      this.zoom = latitude && longitude ? this.zoom + 7 : this.zoom;
      const geoData = await this.$store.geolocation.initGeolocationData(
        this.project
      );
      this.map = await this.initMap(this.project, geoData);
    },
    async initMap(project, geoData) {
      const options = mapUtils.mapOptions({ interactive: false });

      var map = await mapUtils.makeMap(
        'map-static',
        project,
        options,
        this.zoom
      );

      let markers = mapUtils.initMarkerLayer(map, project, geoData);
      if (!markers || markers.length === 0) {
        mapUtils.initMapLayers(map, project, geoData);
      }
      setTimeout(function () {
        map.invalidateSize();
      }, 10);
      return map;
    },
    openProjectMapModal() {
      this.mapModal = this.$store.geolocation.getModal();
      this.mapModal.show();
    },
  };
}

Alpine.data('MapViewerStatic', MapViewerStatic);
