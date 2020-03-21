import React from 'react';
import { IonSlides, IonSlide, IonContent, IonRow, IonGrid, IonButton, IonIcon } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';

// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};


class Slides extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = slideOpts;
      }
    
      componentDidMount() {
        this.setState({});
      }

      slideEnd(e:any){

        window.localStorage.slides = true;
        window.location.reload();

      }
    
      render() {
  return(<IonContent style={{height:'100vw'}}>
    <IonSlides pager={true} options={slideOpts} style={{height:'100vh'}}>
      <IonSlide>
          <IonGrid>
          <IonRow>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}> Cómo funciona?</h1>
        </IonRow>
        <IonRow>
        <p>Covid Map recibe reportes anónimos de personas que han sido diagnosticadas positivo para Coronavirus.</p>            
        </IonRow>
        <IonRow>          
          <IonButton  fill="clear" style={{margin:'0 auto'}}><IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
        </IonGrid>
      </IonSlide>
      <IonSlide>
      <IonGrid>
          <IonRow>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Objetivo</h1>
        </IonRow>
        <IonRow>
        <p>Covid Map identifica las posibles zonas donde se encuentra el virus gracias a la comunidad, con el fin de ayudar a que se tomen las precauciones acorde a las zonas. Juntos podemos lograrlo!</p>
        </IonRow>
        <IonRow>          
          <IonButton  fill="clear" style={{margin:'0 auto'}}><IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
        </IonGrid>

      </IonSlide>
      <IonSlide>
    
      <IonGrid>
      <IonRow>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Privacidad</h1>
        </IonRow>
        <IonRow>
        <p>Covid Map no almacena informacion de ubicacion, el algoritmo solo usa la ubicacion para procesar un radio de 200mts. En ningun momento guarda ubicaciones exactas.</p>
        </IonRow>
        <IonRow>
            
            <IonButton fill="clear" style={{margin:'0 auto'}} onClick={this.slideEnd}>Entendido <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
    </IonGrid>

      </IonSlide>
    </IonSlides>
  </IonContent>)
      }
}

export default Slides;