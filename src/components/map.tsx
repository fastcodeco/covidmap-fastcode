import React from 'react';
import ReactMapGL, { Source, Layer,} from 'react-map-gl';
import { IonFab, IonFabButton, IonIcon} from '@ionic/react';
import { locateOutline, callOutline, medkitOutline, reloadOutline, listOutline} from 'ionicons/icons';
import API from '../services/api';
import './styles/map.css';
import Detailed from './detailed';


var getPosition = function (options: any) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options || {});
    });
}

/*
const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'reports',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint:{
        'text-color': 'white'
    }
  };
*/


class Map extends React.Component<any, any>{



    constructor(props: any) {
        
        super(props);

        this.state = {
            slides: window.localStorage.slides,
            suggestions: false,
            showLoading: true,
            showDetails: false,       
            viewport : {
        
            },
        };

    }

    async componentDidMount() {    

        if(this.state.slides){
            this.initMap();
        }
        

    }

    loadReports = async () => {
    
        let rs:any = await API.get().catch(()=>{
          this.setState({reports:[]})
        });

        this.setState({reports : rs.data})
    
    
      }


    _onViewportChange = (viewport: any) => {
        this.setState({ viewport });
    };


    initMap = async () => {

        let geolocation: any = await getPosition({}).catch(console.error);

        try {


            this.setState({
                viewport: {
                    width: '100vw',
                    height: '75vh',
                    longitude: geolocation.coords.longitude,
                    latitude: geolocation.coords.latitude,
                    zoom: 5,
                    maxZoom: 13,
                    minZoom: 5,
                    transitionDuration: 700,
                },
                showLoading: false
            })



        } catch (e) { }

    }


    locateMe = async () => {

        this.setState({showLoading:true})

        let geolocation: any = await getPosition({}).catch(console.error);

        try {


            this.setState({
                viewport: {
                    width: '100vw',
                    height: '80vh',
                    longitude: geolocation.coords.longitude,
                    latitude: geolocation.coords.latitude,
                    zoom: 13,
                    maxZoom: 13,
                    minZoom: 5,
                    transitionDuration: 700,
                },
                showLoading: false
            })



        } catch (e) { }

    }

    call(){
        if(window.confirm("Solo si tienes síntomas haz la llamada a la línea nacional especial para atención del Covid-19. No le demos mal uso, gracias."))
        window.location.href = "tel:192";
    }

    medicalCenters(){
        
    }

    render() {
        return <div>


             <ReactMapGL
            {...this.state.viewport}
            onViewportChange={this._onViewportChange}
            mapboxApiAccessToken='pk.eyJ1IjoiZmFzdGNvZGUiLCJhIjoiY2s4MGczdmNxMGFybzNkc2Z4M24wYWhqZyJ9.xo6Amo_Nh2ZbxoNDq5t7BQ'
            width='100vw'
            height='80vh'
            center = {[this.state.viewport.latitude, this.state.longitude]}
            mapStyle="mapbox://styles/mapbox/dark-v9"

        >
 <Source
        id="my-data"
          type="geojson"
          data={process.env.REACT_APP_MAP_DATA_URL || 'http://localhost:5000/api/cases.geojson'}
          clusterMaxZoom={13}
          clusterRadius={20}
        >

     <Layer
            type= 'circle'
            source= 'reports'
            paint={{
                'circle-radius': 17,
                'circle-color': [
                    'match',
                    ['get', 'status'],
                    "Symptoms",
                    '#ffc409',
                    "Confirmed",
                    'red',
                    "confirmed",
                    'red',
                    "Death",
                    "white",
                    '#ffc409'
                ],
                'circle-opacity': 0.4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ccc'
              }}

  />


        </Source>
        </ReactMapGL>
        
          
     <div className="fabs">
     <IonFab vertical="bottom" color="success" slot="fixed" style={{left:'auto', right:'290px'}} >
                <IonFabButton onClick={()=>this.setState({showDetails:true})} color="dark">
                    <IonIcon icon={listOutline} />                    
                </IonFabButton>
            </IonFab>    
        
         <IonFab vertical="bottom" color="success" slot="fixed" style={{left:'auto', right:'220px'}} >
                <IonFabButton href="/" target="_self" color="dark">
                    <IonIcon icon={reloadOutline} />                    
                </IonFabButton>
            </IonFab>    

            
             <IonFab vertical="bottom" color="success" slot="fixed" style={{left:'auto', right:'150px'}} >
                <IonFabButton href={`https://www.google.com/maps/search/?api=1&query=centros+de+salud`} target="_blank" color="dark">
                    <IonIcon icon={medkitOutline} />                    
                </IonFabButton>
            </IonFab>    

        
         <IonFab vertical="bottom" color="success" slot="fixed" style={{left:'auto', right:'80px'}} >
                <IonFabButton onClick={this.call} color="dark">
                    <IonIcon icon={callOutline} />
                    
                </IonFabButton>
            </IonFab>
         
            <IonFab vertical="bottom" horizontal="end" slot="fixed"  >
                <IonFabButton onClick={this.locateMe}>
                    <IonIcon icon={locateOutline} />
                </IonFabButton>
            </IonFab>
         
            </div>

            <Detailed open={this.state.showDetails} close={()=>this.setState({showDetails:false})}/>

        </div>



    }

}

export default Map;