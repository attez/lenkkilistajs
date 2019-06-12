<template>
    <l-map ref="map"
        style="height: 100%; width: 100%"
        :zoom="zoom"
        :center="center"
        :bounds="bounds"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        :options="options"  
    >
        <l-tile-layer :url="url" attribution="OSM"></l-tile-layer>
        <l-feature-group ref="trackGroup" v-if="workout">
            <l-feature-group @layeradd="onTrackAdded" v-for="track in workout.tracks" :key="track.track_number">
                <l-polyline v-for="segment in track.segments" :key="segment.segment_number"
                    :lat-lngs="segment.convertedCoordinates"
                    :color="polyline.color">
                </l-polyline>
            </l-feature-group>
        </l-feature-group>
    </l-map>

</template>

<script>
import {LMap, LTileLayer, LPolyline, LFeatureGroup} from 'vue2-leaflet'
import { latLngBounds } from "leaflet";
export default {
    name:'Map',
    components: {
        'l-map': LMap,
        'l-tile-layer': LTileLayer,
        'l-polyline': LPolyline,
        'l-feature-group': LFeatureGroup

    }
    ,
    data () {
        return {
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: 0,
            center: [0, 0], 
            bounds: this.getBounds(),
            options:{attributionControl:true},
            polyline: {color:'green'},
        }
    },
    props: {
        workout: Object // must contain tracks[].segments[].convertedCoordinates
    },
    methods: {
        zoomUpdated (zoom) {
            this.zoom = zoom;
        },
        centerUpdated (center) {
            this.center = center;
        },
        boundsUpdated (bounds) {
            console.log("Bounds updated " + bounds)
            this.bounds = bounds;
        },
        onTrackAdded() {
            // Bounds are now calculated on the server.
            //console.log("onTrackAdded ran")
            //this.bounds = this.$refs.trackGroup.mapObject.getBounds()
        },
        getBounds() {
            if (!this.workout || !this.workout.bounds) {
                return latLngBounds()
            }
            return latLngBounds([[this.workout.bounds.min.latitude, this.workout.bounds.min.longitude],
                                 [this.workout.bounds.max.latitude, this.workout.bounds.max.longitude]])
        }

    },
    mounted () {
      this.$nextTick(() => {
        let lmap = this.$refs.map.mapObject
        //console.log(lmap)
        if (lmap && lmap.attributionControl) {
            lmap.attributionControl.setPrefix('') // removes default 'leaflet' attribution prefix text
        } 
        
      })
      console.log("WORKOUT")
      console.log(this.workout)
    }
}
</script>


<style>


</style>
