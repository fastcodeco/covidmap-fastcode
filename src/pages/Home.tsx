import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol} from '@ionic/react';
import React from 'react';
import './styles/Home.css';
import Slides from '../components/slides';
import Map from '../components/map';
import Report from '../components/report';
import API from '../services/api';
import Recomendaciones from '../components/recomendaciones';





export default class Home extends React.Component<any, any>{


  

  constructor(props: any) {
    super(props)


    this.state = {
      slides: window.localStorage.slides,
      cases : {
        confirmed:0,
        deaths:0,
        recovered:0
      }
    }

  }

  async componentDidMount() {

      this.loadCases();
    
  

  }

 loadCases = async () => {

    let cases:any = await API.cases().catch(console.log)

    cases = cases.data["Colombia"]

    let status = {
      confirmed: cases[cases.length-1].confirmed,
      deaths: cases[cases.length-1].deaths,
      recovered: cases[cases.length-1].recovered
    }


    this.setState({cases:status});


 }

  goToVideo = () =>{
    this.setState({suggestions: !this.state.suggestion})
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


     const doit = window.confirm("SOLO ENVÍA EL REPORTE SI ES UN CASO CONFIRMADO. Ayúdanos a no generar información falsa.");

     if(!doit)
     {
       alert("Muchas gracias por entender");
       this.setState({showReportForm:false});

       return;
     }
   
     this.setState({showReportForm:false});
   
    let geolocation:any = await this.getPosition({}).catch(console.log);
     console.log('geoposicion', geolocation.coords);
     let data:any = values;
     data.radius = [geolocation.coords.latitude, geolocation.coords.longitude];

     console.log(data);

     let post:any = await API.save(data).catch(console.error);

     if(post.status === 201)
    { 
      alert("Gracias por contribuir, se ha enviado el reporte");
      window.location.reload();
    }

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
       <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Covid Map por <a href="https://fastcodelab.com" target="_blank" rel="noopener noreferrer"  style={{color:'white', textDecoration:'none'}}>Fastcode</a></IonTitle>
        </IonToolbar>
      </IonHeader>
      
    }

{ !this.state.slides ?  ' ' :  
<div>
<IonToolbar>
  <IonGrid>
  <IonRow >
    <IonLabel  style={{textAlign:'center', width:'100%', display:'block', fontSize:'11px', paddingBottom:'7px'}}>Estado COVID-19 Colombia</IonLabel>
      </IonRow>

    <IonRow >
      <IonCol style={{justifyContent:'center'}}>
        <IonLabel color="warning" style={{textAlign:'center', width:'100%', display:'block', fontSize:'11px'}}>Reportados</IonLabel>
        <IonLabel color="warning" style={{textAlign:'center', width:'100%', display:'block'}}>{this.state.cases.confirmed}</IonLabel>
      </IonCol>
      <IonCol>
        <IonLabel color="danger" style={{textAlign:'center', width:'100%', display:'block',fontSize:'11px'}}>Muertes</IonLabel>
        <IonLabel color="danger" style={{textAlign:'center', width:'100%', display:'block'}}>{this.state.cases.deaths}</IonLabel>
      </IonCol>
      <IonCol>
      <IonLabel style={{textAlign:'center', width:'100%', display:'block'}}>
        <IonLabel color="success" style={{textAlign:'center', width:'100%', display:'block', fontSize:'11px' }}>Recuperados</IonLabel>
        <IonLabel color="success" style={{textAlign:'center', width:'100%', display:'block'}}>{this.state.cases.recovered}</IonLabel>
      </IonLabel>
      </IonCol>
    </IonRow>
  </IonGrid>
    </IonToolbar> 
<IonSegment mode="md" onIonChange={e => console.log('Segment selected', e.detail.value)} style={{background:'gray', borderRadius: 'none'}}>
          <IonSegmentButton value="map" onClick={this.report}>
            <IonLabel class="text-white">Reportar un Caso</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="suggestion" onClick={this.goToVideo}>
            <IonLabel  class="text-white">Recomendaciones </IonLabel>
          </IonSegmentButton>

        </IonSegment>
        </div>
        
  }


      <IonContent style={{display: this.state.slides ? 'flex' : 'none' }} >
        <Map />
      </IonContent>

  
     <Report open={this.state.showReportForm} submit={this.sendReport} cancel={()=>{ this.setState({showReportForm:false}) }}/>
     <Recomendaciones open={this.state.suggestions} cancel={()=>{ this.setState({suggestions:false}) }}/>
   
    </IonPage>


  );
    }


};

