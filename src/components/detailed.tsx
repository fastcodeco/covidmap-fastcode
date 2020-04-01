import React from 'react';
import { IonRow, IonGrid, IonModal, IonContent, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonIcon, IonFab, IonFabButton, IonLabel, IonSearchbar, } from '@ionic/react';
import API from '../services/api';
import { closeCircleOutline } from 'ionicons/icons';


class Detailed extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = {
            data:[],
            cacheData:[],
        };
      }

    componentDidMount(){

        this.loadData();
        
    }

   


  loadData = async () =>{
       let data:any = await API.get_co_details().catch(console.log);
       data = data.data; 


       this.setState({
        data:data, 
        cacheData:data,
        dataLoaded:true
    })

  }

  Search(value:any){

    if(value==='' || !value)
      {
          this.setState({data:this.state.cacheData})
          return true;
      }


    if(value.split('').length < 2)
    return true;


       let result:any = [];

       this.state.cacheData.forEach((item:any)=>{


                if(item.city.toLowerCase().normalize().match(value.toLowerCase().normalize()))
                  result.push(item);
           
       })


       this.setState({data:result});

       return true;

  }

    

    render(){
        return( 
            <div>
          <IonModal isOpen={this.props.open}  swipeToClose={true} onDidDismiss={this.props.close}>
              <IonContent>
              <IonFab vertical="top" color="success" slot="fixed"  style={{left:'auto', right:'10px', marginTop:'20px', opacity:0.8}} >
                <IonFabButton  onClick={this.props.close} color="light">
                    <IonIcon icon={closeCircleOutline} />                    
                </IonFabButton>
            </IonFab>    
              <IonGrid class="sendReport">                
              <IonRow>
              <h1 style={{color:'white', width:'100%'}}>Casos en Colombia</h1>
              <IonLabel style={{fontSize:'12px'}}>Fuente: Reportes MinSalud Colombia.</IonLabel>
             </IonRow>

             <IonRow>
             <IonSearchbar color="dark" placeholder="Buscar"   onIonChange={e => this.Search(e.detail.value!)}></IonSearchbar>
             </IonRow>

             <IonRow>
             <IonCol>

                 { this.state.data.length > 0 ? this.state.data.map((data:any)=>{
            
                     return <IonCard  color="dark" key={data.city}>
                     <IonCardHeader>
                     <IonCardSubtitle>{!data.city.match("sin identificar") ? data.city : data.state}</IonCardSubtitle>
                     </IonCardHeader>
                     <IonCardContent>
                           <table style={{width:'98%', margin:'0 auto'}}>
                               <tbody>
                                   <tr>
                                       <td style={{width:'50%'}}>Confirmados</td>
                                       <td style={{color:'red', width:'50%'}}>{data.confirmed || 0}</td>
                                   </tr>
   
                                   <tr>
                                       <td style={{width:'50%'}}> Recuperados</td>
                 <td style={{color:'green', width:'50%'}}>{data.recovered || 0}</td>
                                   </tr>
                                   
                                   <tr>
                                       <td style={{width:'50%'}}>Muertes</td>
                                       <td style={{width:'50%'}}>{data.deaths || 0}</td>
                                   </tr>
                               </tbody>
                           </table>
                     </IonCardContent>
                 </IonCard>;
                 }) : this.state.dataLoaded ? 'No hay resultados' : ''}
             
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