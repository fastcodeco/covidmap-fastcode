import React from 'react';
import {  IonRow, IonGrid, IonModal, IonButton, IonLabel, } from '@ionic/react';


class Recomendaciones extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    
        this.state = {};
      }

    componentDidMount(){
        
    }

    captchaValidation = (e:any) => {
        console.log(e);
    }

    daysChange = (e:any) => {
        console.log(e)

    }

    submit = (e:any) => {
                console.log(e)
    }
    

    render(){
        return( <IonModal isOpen={this.props.open}>
              <IonGrid class="sendReport">

              <IonRow style={{justifyContent:'center'}}>
                  <IonLabel>Video de Recomendaciones por BBC News</IonLabel>
              </IonRow>
              
              <IonRow style={{justifyContent:'center'}}>
                  
               <iframe width="100%" src="https://www.youtube.com/embed/B_Gzc2Z7uQY" title="video info" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style={{border:'none'}} allowFullScreen></iframe>
               </IonRow>

               <IonRow style={{justifyContent:'center'}}>
                   <IonButton fill="clear" href="https://www.who.int/es" target="_blank">Más Información de la OMS</IonButton>
               </IonRow>

                <IonRow style={{justifyContent:'center'}}>
                <IonButton onClick={this.props.cancel} style={{marginRight:'20px'}}>Cerrar</IonButton>
                </IonRow>

              </IonGrid>
          
          </IonModal>
       )
    }

}
 

export default Recomendaciones;