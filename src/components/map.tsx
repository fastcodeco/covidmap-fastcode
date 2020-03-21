import React from 'react';
import ReactMapGL from 'react-map-gl';




interface props { }

var getPosition = function (options:any) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options || {});
    });
  }

class Map extends React.Component<any, any>{


    
      async componentDidMount() {

      let geolocation:any = await getPosition({}).catch(console.error);

      try{

              // resp.cooårds.latitude
            // resp.coords.longitude
            console.log(geolocation);
           

      }catch(e){}
          
        this.setState({});


      }

      slideEnd(e:any){

        window.localStorage.slides = true;
        window.location.reload();

      }
    
      render() {
  return( <ReactMapGL
    mapboxApiAccessToken='pk.eyJ1IjoiZmFzdGNvZGUiLCJhIjoiY2s4MGczdmNxMGFybzNkc2Z4M24wYWhqZyJ9.xo6Amo_Nh2ZbxoNDq5t7BQ'
        latitude={6.2518401}
        longitude={-75.563591}
        zoom={8}
        onViewportChange={(viewport) => {
          // eslint-disable-next-line
          const {width, height, latitude, longitude, zoom} = viewport;
          // call `setState` and use the state to update the map.
        }}
        width="100%"
        height="100%"
    >
  
        </ReactMapGL>
    )
      }

}

export default Map;