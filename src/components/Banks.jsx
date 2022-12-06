import React from 'react';

export default class Bank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:props.name,
            rata:props.rata
        }
    }

    render(){
        return(
        <div className='BCR'>
            <div>
                    <p>Banca</p>
                    <p>{this.state.name}</p>
            </div>
            <div>
                    <p>Randament net</p>
                    <p>{this.state.rata}</p>
            </div>
        </div>
        );
    }
}