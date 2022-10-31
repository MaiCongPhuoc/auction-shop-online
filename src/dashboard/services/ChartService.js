import axios from 'axios';
import { BARCHART_URL } from './Commom';

class ChartService {
    static getListChart(sYear) {
        return axios.get(`${BARCHART_URL}/${sYear}`);
    }
}

export default ChartService;