import React from "react";
import withNavigation from "./withNavigation";

class ErrorBoundary extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }

    

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className='error-boundary'>
            <h1>Something went wrong.</h1>
            <button onClick={() => { this.props.navigate('/'); window.location.reload()}}>Back To Dashboard</button>
          </div>
        ) 
      }
  
      return this.props.children; 
    }
}

export default withNavigation(ErrorBoundary);

