import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        vendors: [
            { name: "Castor", number: "10012", product: "stardust" },
            { name: "Pollux", number: "90453", product: "pixels" },
            { name: "Zappa", number: "22222", product: "invention" }
        ]
    },
    getters: {
        vendors: state => {
            return state.vendors;
        }
    },
    mutations: {
        'ADD_VENDOR': (state, vendor) => {
            state.vendors.push(vendor);
        }
    },
    actions: {
        addVendor: (context, vendor) => {
            context.commit('ADD_VENDOR', vendor);
        }
    }
})