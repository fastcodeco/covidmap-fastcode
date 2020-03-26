import React from 'react';
import { IonRow, IonGrid, IonButton,  IonModal, IonLabel, IonAlert, IonContent, } from '@ionic/react';
import ReCAPTCHA from "react-google-recaptcha";

const captchaRef = React.createRef<any>();

class Report extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = {
            captchaOk : false,
            days: "none",
            type: "Symptoms"
        };
      }

    componentDidMount(){

        this.setState({type:""})
        
    }

    captchaValidation = (e:any) => {
        console.log(e);
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
                    data.type = "Symptoms";

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
              <h1 style={{color:'white'}}>Reportar Caso Sospechoso Anónimamente</h1>
              <IonLabel style={{fontSize:'12px'}}>Usaremos tu reporte para crear un caso sospechoso en nuestros registros. No almacenaremos ni mostraremos ubicaciones exactas.</IonLabel>
             </IonRow>
             <br />

            <form >
 
 
         
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
               <IonButton color="danger" onClick={this.submit} >Enviar Reporte</IonButton>
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