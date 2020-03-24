import React from 'react';
import { IonRow, IonGrid, IonModal, IonContent, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonFab, IonFabButton, } from '@ionic/react';
import ReCAPTCHA from "react-google-recaptcha";
import Axios from 'axios';
import API from '../services/api';
import { personOutline, closeCircleOutline } from 'ionicons/icons';

const captchaRef = React.createRef<any>();

class Detailed extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = {
            data:[]
        };
      }

    componentDidMount(){

        this.loadData();
        
    }

   


  loadData = async () =>{
       let data:any = await API.get_co_details().catch(console.log);
       data = data.data;

       this.setState({data:data})

       console.log(data);
  }

    

    render(){
        return( 
            <div>
          <IonModal isOpen={this.props.open}  swipeToClose={true}>
              <IonContent>
              <IonFab vertical="top" color="success" slot="fixed"  style={{left:'auto', right:'10px', opacity:0.8}} >
                <IonFabButton  onClick={this.props.close} color="light">
                    <IonIcon icon={closeCircleOutline} />                    
                </IonFabButton>
            </IonFab>    
              <IonGrid class="sendReport">
              <IonRow>
              <h1 style={{color:'white'}}>Casos en Colombia</h1>
             </IonRow>

             <IonRow>
             <IonCol>

                 {this.state.data.map((data:any)=>{
            
                     return <IonCard  color="dark" key={data.city}>
                     <IonCardHeader>
                     <IonCardSubtitle>{!data.city.match("sin identificar") ? data.city : data.state}</IonCardSubtitle>
                     </IonCardHeader>
                     <IonCardContent>
                           <table style={{width:'98%', margin:'0 auto'}}>
                               <tbody>
                                   <tr>
                                       <td >Confirmados</td>
                                       <td style={{color:'red'}}>{data.confirmed || 0}</td>
                                   </tr>
   
                                   <tr>
                                       <td>Recuperados</td>
                 <td style={{color:'green'}}>{data.recovered || 0}</td>
                                   </tr>
                                   
                                   <tr>
                                       <td>Muertes</td>
                                       <td>{data.deaths || 0}</td>
                                   </tr>
                               </tbody>
                           </table>
                     </IonCardContent>
                 </IonCard>;
                 })}
             
              </IonCol>
             </IonRow>
           
             <br />

           
      
              </IonGrid>
              
              </IonContent>
          </IonModal>


          </div>
       )
    }

}
 

export default Detailed;