import React from 'react';
import { IonRow, IonGrid, IonButton,  IonModal, IonLabel, IonSegmentButton, IonSegment } from '@ionic/react';
import ReCAPTCHA from "react-google-recaptcha";

const captchaRef = React.createRef<any>();

class Report extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = {
            captchaOk : false,
            days: "lessthan5"
        };
      }

    componentDidMount(){
        
    }

    captchaValidation = (e:any) => {
        console.log(e);
    }

    daysChange = (e:any) => {
        console.log(e)
        this.setState({days:e.detail.value})
    }

    submit = (e:any) => {
   
        let captcha = captchaRef.current.getValue();

                if(captcha)
                {
                    let data:any = {};
                    data.days = this.state.days;

                    console.log(data);

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
        return( <IonModal isOpen={this.props.open}>
              <IonGrid class="sendReport">
              <IonRow>
              <h1 style={{color:'white'}}>Reportar Caso Anónimamente</h1>
              <IonLabel style={{fontSize:'12px'}}>Usaremos tu reporte para crear una zona en el mapa. No almacenaremos ni mostraremos ubicaciones exactas.</IonLabel>
             </IonRow>
             <br />

            <form >
             <IonRow>
               <IonLabel>Hace cuantos días fue diagnosticado?</IonLabel>
             
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
            sitekey="6LdG_eIUAAAAAHgzH3kItGIJOJgSc4RVfQY2WWrG"
            onChange={this.onChangeCaptcha}     
             />
           </IonRow>
      <br/>

             <IonRow>
               <IonLabel style={{textAlign:'center', fontSize:'11px'}}>Al enviar la información usted acepta el procesamiento de datos por parte de Covid Map App.</IonLabel>
               </IonRow>

               <IonRow style={{justifyContent: 'center'}}>
               <IonButton  onClick={this.props.cancel} style={{marginRight:'20px'}}>Cancelar</IonButton>
               <IonButton color="danger" onClick={this.submit} >Enviar Caso</IonButton>
               </IonRow>

             </form>

              </IonGrid>
          
          </IonModal>
       )
    }

}
 

export default Report;