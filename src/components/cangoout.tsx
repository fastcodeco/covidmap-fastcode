import React from 'react';
import {IonModal,IonContent, IonButton, } from '@ionic/react';


class CanGoOut extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
    
        this.state = { };
      }

    componentDidMount(){

      
        
    }



    render(){
        return( 
            <div>
          <IonModal isOpen={this.props.open}  swipeToClose={true}>
              <IonContent style={{justifyContent:'center'}}>
          
              <h1 style={{color:'white', fontSize:'6rem', textAlign:'center', marginTop:'20vh'}}>NO!</h1>
              <br/>
              <IonButton fill="clear" style={{display:"flex"}} onClick={this.props.close}>VOLVER</IonButton>
        
                </IonContent>
        </IonModal>

          </div>
       )
    }

}
 

export default CanGoOut;