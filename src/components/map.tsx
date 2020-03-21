import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { locateOutline } from 'ionicons/icons';
import API from '../services/api';



var getPosition = function (options: any) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options || {});
    });
}



class Map extends React.Component<any, any>{



    constructor(props: any) {
        
        super(props);

        this.state = {
            viewport: {},
            slides: window.localStorage.slides,
        };

    }

    async componentDidMount() {

        if(this.state.slides){
            this.loadReports();
            this.initMap();
        }
        

    }

    loadReports = async () => {
    
        let rs:any = await API.get().catch(()=>{
          this.setState({reports:[]})
        });

        this.setState({reports : rs.data})
    
        console.log(this.state.reports)
    
      }


    _onViewportChange = (viewport: any) => {
        this.setState({ viewport });
    };


    initMap = async () => {

        let geolocation: any = await getPosition({}).catch(console.error);

        try {

            console.log(geolocation);

            this.setState({
                viewport: {
                    width: '100vw',
                    height: '100vh',
                    longitude: geolocation.coords.longitude,
                    latitude: geolocation.coords.latitude,
                    zoom: 14,

                }
            })



        } catch (e) { }

    }


    render() {
        return <div> <ReactMapGL
            {...this.state.viewport}
            onViewportChange={this._onViewportChange}
            mapboxApiAccessToken='pk.eyJ1IjoiZmFzdGNvZGUiLCJhIjoiY2s4MGczdmNxMGFybzNkc2Z4M24wYWhqZyJ9.xo6Amo_Nh2ZbxoNDq5t7BQ'
            width='100vw'
            height='100vh'
            center = {[this.state.viewport.latitude, this.state.longitude]}
            mapStyle="mapbox://styles/mapbox/dark-v9"
        >
 <Source
            id="my-data"
          type="geojson"
          data={this.state.reports}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
    
        >
            <Layer
            type="circle"
            paint={{
              'circle-radius': 20,
              'circle-color': 'red'
            }} />

            

        </Source>
        </ReactMapGL>
            <IonFab vertical="bottom" horizontal="end" slot="fixed"  >
                <IonFabButton onClick={this.initMap}>
                    <IonIcon icon={locateOutline} />
                </IonFabButton>
            </IonFab>
        </div>



    }

}

export default Map;