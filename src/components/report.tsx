import React from 'react';
import { IonRow, IonGrid, IonButton,  IonModal, IonLabel, IonSegmentButton, IonSegment, IonAlert, IonContent, } from '@ionic/react';
import ReCAPTCHA from "react-google-recaptcha";

const captchaRef = React.createRef<any>();

class Report extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = {
            captchaOk : false,
            days: "lessthan5",
            type: ""
        };
      }

    componentDidMount(){

        this.setState({type:""})
        
    }

    captchaValidation = (e:any) => {
        console.log(e);
    }

    daysChange = (e:any) => {
        console.log(e)
        this.setState({days:e.detail.value})
    }

    typeChange = (e:any) => {
        console.log(e)

        if(e.detail.value.match("Symptoms"))
        this.setState({showSymptomsAlert:true})

        this.setState({type:e.detail.value})
    }


    submit = (e:any) => {
   
        let captcha = captchaRef.current.getValue();

                if(captcha)
                {
                    let data:any = {};
                    data.days = this.state.days;
                    data.captcha = captcha;
                    data.type = this.state.type;

                    this.setState({type:""})

                    this.props.submit(data);
                
                }
                else{
                    alert("Por favor valida el Captcha")
                }
    }

    onChangeCaptcha(data:any){

        console.log(data, 'here')
        if(data)
        this.setState({captchaOk:true})

    }


    

    render(){
        return( 
            <div>
          <IonModal isOpen={this.props.open} onDidDismiss={()=>{this.props.dismiss(); this.setState({type:""})}} swipeToClose={true}>
              <IonContent>
              <IonGrid class="sendReport">
              <IonRow>
              <h1 style={{color:'white'}}>Reportar Caso Anónimamente</h1>
              <IonLabel style={{fontSize:'12px'}}>Usaremos tu reporte para crear una zona en el mapa. No almacenaremos ni mostraremos ubicaciones exactas.</IonLabel>
             </IonRow>
             <br />

            <form >
            <IonRow>
               <IonLabel>Defina el tipo de caso:</IonLabel>
             
          </IonRow>
     
            <IonRow>
                <IonSegment mode="md" style={{background:'white'}} value={this.state.type} onIonChange={this.typeChange} >
            <IonSegmentButton value="Symptoms" >
                <IonLabel class="text-blue">Con Síntomas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Confirmed" >
                <IonLabel  class="text-blue">Confirmado</IonLabel>
            </IonSegmentButton>
            </IonSegment>
             </IonRow>
      <br/>

             <IonRow>
               <IonLabel>Hace cuantos días siente síntomas o fue diagnosticado?</IonLabel>
             
          </IonRow>
     
            <IonRow>
                <IonSegment mode="md" style={{background:'white'}} value={this.state.days} onIonChange={this.daysChange} >
            <IonSegmentButton value="lessthan5" >
                <IonLabel class="text-blue">Menos de 5</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="morethan5" >
                <IonLabel  class="text-blue">Más de 5</IonLabel>
            </IonSegmentButton>
            </IonSegment>
             </IonRow>
      <br/>
            <IonRow style={{justifyContent:'center'}}>
            <ReCAPTCHA  
            ref={captchaRef}  
            sitekey= {process.env.REACT_APP_CAPTCHAT_WEB_KEY || "6LdG_eIUAAAAAHgzH3kItGIJOJgSc4RVfQY2WWrG"}
            onChange={this.onChangeCaptcha}     
             />
           </IonRow>
      <br/>

             <IonRow>
               <IonLabel style={{textAlign:'center', fontSize:'11px'}}>Al enviar la información usted acepta el procesamiento de datos por parte de Covid Map.</IonLabel>
               </IonRow>

               <IonRow style={{justifyContent: 'center'}}>
               <IonButton  onClick={this.props.cancel} style={{marginRight:'20px'}}>Cancelar</IonButton>
               <IonButton color="danger" onClick={this.submit} >Enviar Caso</IonButton>
               </IonRow>
         

             </form>

              </IonGrid>
              
              </IonContent>
          </IonModal>

          <IonAlert
          isOpen={this.state.showSymptomsAlert}
          onDidDismiss={() => this.setState({showSymptomsAlert:false})}
          header={'Información'}
          message={'<p>Solo envía el reporte si presentas al menos dos de los siguientes síntomas:<br/> <ul style="text-aling:left !important; justify-selft:start !important"> <li> Fiebre arriba de 38°C</li> <li>Tos seca</li> <li> Malestar general (sobre todo cansancio)</li> <li> Dolor de cabeza</li> <li> Dificultad para respirar</li> <li> En algunos casos diarrea</li> </ul></p>'}
          buttons={['Aceptar']}
        />

          </div>
       )
    }

}
 

export default Report;