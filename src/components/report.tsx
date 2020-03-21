import React from 'react';
import {  IonRow, IonGrid, IonButton,  IonModal, IonLabel, IonTextarea, IonSegmentButton, IonSegment } from '@ionic/react';

class Report extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    
        this.state = {};
      }
    

    render(){
        return( <IonModal isOpen={this.props.open}>
              <IonGrid class="sendReport">
              <h1 style={{color:'white'}}>Reportar Caso</h1>
            <form >
             <IonRow>
               <IonLabel>Hace cuantos días fue diagnosticado?</IonLabel>
          </IonRow>
            <IonRow>
                <IonSegment mode="md" style={{background:'white'}} value="lessthan5" >
            <IonSegmentButton value="lessthan5" >
                <IonLabel class="text-blue">Menos de 5</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="morethan5" >
                <IonLabel  class="text-blue">Más de 5</IonLabel>
            </IonSegmentButton>
            </IonSegment>
             </IonRow>
             <IonRow>
               <IonLabel>Si lo desea puede compartir mas detalles (opcional)</IonLabel>
               </IonRow>
               <IonRow>
               <IonTextarea  value={this.state.description} rows={20} autoGrow placeholder="Detalles" />
             </IonRow>

             <IonRow>
               <IonLabel style={{textAlign:'center', fontSize:'11px'}}>Al enviar la informacion usted acepta el procesamiento de datos por parte de Fastcode</IonLabel>
               </IonRow>

               <IonRow style={{justifyContent: 'center'}}>
               <IonButton  onClick={this.props.cancel} style={{marginRight:'20px'}}>Cancelar</IonButton><IonButton color="danger" onClick={this.props.submit} >Enviar Caso</IonButton>
               </IonRow>

             </form>

              </IonGrid>
          
          </IonModal>
       )
    }

}
 

export default Report;