import { API_URL } from '../constants';
import { makeRequest } from '../utils';

class HobbyService {
  async getAll() {
    return await makeRequest(API_URL + 'api/hobby', 'GET');
  }
}
const hobbyService = new HobbyService();
export default hobbyService;
