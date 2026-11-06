import {Component} from 'react';
export default class ErrorBoundary extends Component{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){if(this.state.failed)return <main style={{margin:0,padding:32}}><h1>No se pudo abrir esta pantalla.</h1><p>El trabajo guardado no se ha borrado. Vuelve al inicio para continuar y recupera tu copia JSON si el problema está en un mapa.</p><button className="btn" onClick={()=>{window.location.hash='inicio';window.location.reload();}}>Volver al inicio</button></main>;return this.props.children;}
}
