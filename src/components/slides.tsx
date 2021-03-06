import React from 'react';
import { IonSlides, IonSlide, IonContent, IonRow, IonGrid, IonButton, IonIcon } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';

// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400
};


const slideRef = React.createRef<any>();

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

      nextSlide(e:any){
        
        try{
        slideRef.current.slideNext();
        }catch(e){

        }

      }

      

    
      render() {
  return(<IonContent style={{height:'100vw'}}>
    <IonSlides ref={slideRef} pager={true} options={slideOpts} style={{height:'100vh'}} >
    <IonSlide>
          <IonGrid>
          <IonRow style={{justifyContent:'center'}}>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Importancia</h1>
        </IonRow>
        <IonRow style={{justifyContent:'center'}}> 
        <p style={{textAlign:'center'}}>Exponer información acerca de la propagación del virus para la concientización y gestión contra el COVID-19 en Colombia.</p>            
        </IonRow>
        <IonRow style={{justifyContent:'center'}}>          
          <IonButton  fill="clear" style={{margin:'0 auto'}} onClick={this.nextSlide}><IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
        </IonGrid>
      </IonSlide>
    
      <IonSlide>
      <IonGrid>
          <IonRow style={{justifyContent:'center'}}>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Objetivo</h1>
        </IonRow>
        <IonRow style={{justifyContent:'center'}}> 
        <p style={{textAlign:'center'}}>Covid Map fue desarrollada con el propósito de ofrecer a las personas y entidades información más precisa de las posibles zonas con más presencia del virus, y así contribuir en la gestión contra el Covid-19.</p>
        </IonRow>
        <IonRow style={{justifyContent:'center'}}>          
          <IonButton  fill="clear" style={{margin:'0 auto'}} onClick={this.nextSlide}><IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
        </IonGrid>

      </IonSlide>

          
      <IonSlide>
          <IonGrid>
          <IonRow style={{justifyContent:'center'}}>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Cómo funciona?</h1>
        </IonRow>
        <IonRow style={{justifyContent:'center'}}> 
        <p style={{textAlign:'center'}}>Covid Map usa la información de los reportes diarios emitidos por MinSalud Colombia, para luego mostrar las zonas de presencia del COVID-19 en un Mapa. También es capaz de recibir reportes de casos sospechosos para fines estadísticos.</p>            
        </IonRow>
        <IonRow style={{justifyContent:'center'}}>          
          <IonButton  fill="clear" style={{margin:'0 auto'}} onClick={this.nextSlide}><IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>
        </IonRow>
        </IonGrid>
      </IonSlide>
        
      <IonSlide>
    
      <IonGrid>
      <IonRow style={{justifyContent:'center'}}>
        <h1 style={{textAlign:'center', display:'block', width:'100%'}}>Privacidad</h1>
        </IonRow>
        <IonRow style={{justifyContent:'center'}}>
        <p style={{textAlign:'center'}}>Covid Map no almacena la ubicación exacta de un reporte, el algoritmo genera unas coordenadas cercanas de forma aleatoria y luego crea un radio. En ningún momento se guarda ni muestran ubicaciones exactas.</p>
        </IonRow>

        <IonRow style={{justifyContent:'center'}}>
        <p style={{fontSize:'11px', textAlign:'center'}}>Al continuar usted acepta que Covid Map maneje su información</p>      
        </IonRow>
        
        <IonRow style={{justifyContent:'center'}}>    
          
            <IonButton fill="clear" style={{margin:'0 auto'}} onClick={this.slideEnd}>Entendido <IonIcon slot="end" icon={arrowForward}></IonIcon></IonButton>

        </IonRow>

      

    </IonGrid>

      </IonSlide>
    </IonSlides>
  </IonContent>)
      }
}

export default Slides;