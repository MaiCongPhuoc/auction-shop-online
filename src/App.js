// import logo from './logo.svg';
import Dashboard from './dashboard/pages/Dashboard';

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/sb-admin-2.min.css';

import $ from '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/jquery.easing/jquery.easing.min.js';
// import '../node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js';
import '../node_modules/chart.js/dist/Chart.min.js';

function App() {
    return (
        <div className="App">
            <Dashboard />
        </div>
    );
}

export default App;
