import {create} from 'zustand'
import SeminarService from '../services/SeminatService'

const useSeminarStore =(set, get) => ({
    isLoad: false,
    items: [],

    async loadSeminars() {
        set({ isLoad: true });

        const res = await SeminarService.getSeminars();
        set({ isLoad: false });

        if (res.error) {
            console.error("Ошибка загрузки семинаров");
            return;
        }

        set({ items: res });
    },

    async deleteSeminar(id) {
        await SeminarService.deleteSeminar(id);
        set({ items:[...get().items.filter(item => item.id !== id) ]});
    },

    async updateSeminar(id, updatedData) {
        const res = await SeminarService.updateSeminar(id, updatedData);

        if (res.error) {
            console.error("Ошибка обновления семинара");
            return;
        }

        set({
            items: get().items.map(item =>
                item.id === id ? { ...item, ...updatedData } : item
            )
        });
    }
});


export default create(useSeminarStore)