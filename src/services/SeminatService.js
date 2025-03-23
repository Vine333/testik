import Service from './service';

class SeminarService extends Service {
    async getSeminars() {
        return this.request('/seminars');
    }

    async deleteSeminar(id) {
        return this.request(`/seminars/${id}`, {
            method: "DELETE"
        });
    }

    async updateSeminar(id, updatedData) {
        return this.request(`/seminars/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default new SeminarService();
