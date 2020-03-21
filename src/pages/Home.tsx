import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel} from '@ionic/react';
import React from 'react';
import './styles/Home.css';
import Slides from '../components/slides';
import Map from '../components/map';
import Report from '../components/report';
import API from '../services/api';





export default class Home extends React.Component<any, any>{


  

  constructor(props: any) {
    super(props)


    this.state = {
      slides: window.localStorage.slides,
    }

  }

  async componentDidMount() {

      console.log(this.state)

    
  

  }

  loadReports = async () => {
    
    this.setState({reports:await API.get().catch(()=>{
      this.setState({reports:[]})
    })});

    console.log(this.state.reports.data)

  }

  goToVideo = () =>{
    window.open('https://www.youtube.com/watch?v=B_Gzc2Z7uQY');
  }
  
  report = async () => {
      this.setState({showReportForm:true});
  }


  getPosition = function (options:any) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  sendReport = async (values:any) => {


     const doit = window.confirm("SOLO ENVÍA EL REPORTE SI ES UN CASO CONFIRMADO, ayudamos a combatir el virus con buena Fé");

     if(!doit)
     {
       alert("Muchas gracias por entender");
       this.setState({showReportForm:false});

       return;
     }
   
     this.setState({showReportForm:false});
   
    let geolocation:any = await this.getPosition({}).catch(console.log);
     console.log('geoposicion', geolocation.coords);
     let data:any = {};
     data.radius = [geolocation.coords.latitude, geolocation.coords.longitude];
     data.days = 5;
     data.details ="from the app";

     console.log(data);

     let post:any = await API.save(data).catch(console.error);

     if(post.status === 201)
     alert("Gracias por contribuir, se ha enviado el reporte");


  }

  share = async () => {


    let naviga:any = window.navigator;

    try{
      naviga.share({
        title: 'WebShare API Demo',
        url: window.location
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    }catch(e){

    }

  }


  render() {
    return(
    <IonPage >

       { !this.state.slides ?  <Slides  /> : '' }

       { !this.state.slides ?  ' ' :  
       <IonHeader>
        <IonToolbar>
          <IonTitle>Covid Map por <a href="https://fastcodelab.com" target="_blank" rel="noopener noreferrer"  style={{color:'white'}}>Fastcode</a></IonTitle>
        </IonToolbar>
      </IonHeader>
      
    }
{ !this.state.slides ?  ' ' :  
<IonSegment mode="md" onIonChange={e => console.log('Segment selected', e.detail.value)} style={{background:'gray', borderRadius: 'none'}}>
          <IonSegmentButton value="map" onClick={this.report}>
            <IonLabel class="text-white">Reportar un Caso</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="suggestion" onClick={this.goToVideo}>
            <IonLabel  class="text-white">Recomendaciones </IonLabel>
          </IonSegmentButton>
        </IonSegment>
  }

      <IonContent style={{display: this.state.slides ? 'flex' : 'none' }} >
        <Map />
      </IonContent>

  
     <Report open={this.state.showReportForm} submit={this.sendReport} cancel={()=>{ this.setState({showReportForm:false}) }}/>
   
    </IonPage>


  );
    }


};

